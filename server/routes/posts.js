const express = require('express');
const axios = require('axios');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // In production, verify JWT token here
  // For now, we'll just check if token exists
  next();
};

// Post to multiple platforms
router.post('/publish', authenticateToken, async (req, res) => {
  try {
    const { content, platforms, imageUrl } = req.body;
    
    if (!content || !platforms || platforms.length === 0) {
      return res.status(400).json({ error: 'Content and platforms are required' });
    }

    const results = {
      success: [],
      failed: []
    };

    // Post to each selected platform
    for (const platform of platforms) {
      try {
        let result;
        
        switch (platform) {
          case 'telegram':
            result = await postToTelegram(content, imageUrl);
            break;
          case 'viber':
            result = await postToViber(content, imageUrl);
            break;
          default:
            throw new Error(`Unsupported platform: ${platform}`);
        }

        results.success.push({
          platform,
          message: `Successfully posted to ${platform}`,
          data: result
        });
      } catch (error) {
        results.failed.push({
          platform,
          error: error.message
        });
      }
    }

    res.json({
      message: 'Posting completed',
      results
    });

  } catch (error) {
    res.status(500).json({ error: 'Failed to post content' });
  }
});

// Get available platforms
router.get('/platforms', (req, res) => {
  res.json({
    platforms: [
      {
        id: 'telegram',
        name: 'Telegram',
        icon: '📱',
        description: 'Post to Telegram channel'
      },
      {
        id: 'viber',
        name: 'Viber',
        icon: '💬',
        description: 'Post to Viber community'
      }
    ]
  });
});

// Post to Telegram
async function postToTelegram(content, imageUrl) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;

  if (!botToken || !channelId) {
    throw new Error('Telegram configuration missing');
  }

  const message = {
    chat_id: channelId,
    text: content,
    parse_mode: 'HTML'
  };

  if (imageUrl) {
    // Send photo with caption
    const response = await axios.post(
      `https://api.telegram.org/bot${botToken}/sendPhoto`,
      {
        chat_id: channelId,
        photo: imageUrl,
        caption: content,
        parse_mode: 'HTML'
      }
    );
    return response.data;
  } else {
    // Send text message only
    const response = await axios.post(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      message
    );
    return response.data;
  }
}

// Post to Viber
async function postToViber(content, imageUrl) {
  const botToken = process.env.VIBER_BOT_TOKEN;
  const communityId = process.env.VIBER_COMMUNITY_ID;

  if (!botToken || !communityId) {
    throw new Error('Viber configuration missing');
  }

  try {
    // Set webhook to bypass requirement
    try {
      await axios.post(
        'https://chatapi.viber.com/pa/set_webhook',
        {
          url: 'https://httpbin.org/post',
          event_types: ['delivered', 'seen', 'failed']
        },
        {
          headers: {
            'X-Viber-Auth-Token': botToken,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (webhookError) {
      // Continue even if webhook setup fails
    }

    if (imageUrl) {
      // Send image with text
      const response = await axios.post(
        'https://chatapi.viber.com/pa/send_message',
        {
          receiver: communityId,
          type: 'picture',
          text: content,
          media: imageUrl,
          sender: {
            name: 'Social Posting Bot',
            avatar: 'https://example.com/avatar.jpg'
          }
        },
        {
          headers: {
            'X-Viber-Auth-Token': botToken,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.status !== 0) {
        throw new Error(`Viber API error: ${response.data.status_message || 'Unknown error'}`);
      }
      
      return response.data;
    } else {
      // Send text message only
      const response = await axios.post(
        'https://chatapi.viber.com/pa/send_message',
        {
          receiver: communityId,
          type: 'text',
          text: content,
          sender: {
            name: 'Social Posting Bot',
            avatar: 'https://example.com/avatar.jpg'
          }
        },
        {
          headers: {
            'X-Viber-Auth-Token': botToken,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.status !== 0) {
        throw new Error(`Viber API error: ${response.data.status_message || 'Unknown error'}`);
      }
      
      return response.data;
    }
  } catch (error) {
    throw new Error(`Viber posting failed: ${error.response?.data?.status_message || error.message}`);
  }
}



module.exports = router;
