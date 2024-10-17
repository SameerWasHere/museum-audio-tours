// app/api/generate-audio/route.js

import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { text, voicePreset } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing "text" in request body.' },
        { status: 400 }
      );
    }

    let client;

    // Check if GOOGLE_CREDENTIALS is set (Production Environment)
    if (process.env.GOOGLE_CREDENTIALS) {
      // Decode the Base64 string to JSON
      const credentialsJson = Buffer.from(process.env.GOOGLE_CREDENTIALS, 'base64').toString('utf-8');
      const credentials = JSON.parse(credentialsJson);

      // Initialize the Text-to-Speech client with the decoded credentials
      client = new TextToSpeechClient({ credentials });
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      // Initialize the client using GOOGLE_APPLICATION_CREDENTIALS (Local Environment)
      client = new TextToSpeechClient();
    } else {
      throw new Error('Google credentials are not configured.');
    }

    // Configure the Text-to-Speech request
    const requestConfig = {
      input: { text },
      voice: {
        languageCode: 'en-US',
        name: voicePreset || 'en-US-Wavenet-D', // Default WaveNet voice
      },
      audioConfig: { audioEncoding: 'MP3' },
    };

    // Perform the Text-to-Speech request
    const [response] = await client.synthesizeSpeech(requestConfig);

    if (!response.audioContent) {
      throw new Error('No audio content received from Text-to-Speech API.');
    }

    // Convert the audio content to a buffer
    const audioBuffer = Buffer.from(response.audioContent, 'binary');

    // Return the audio as a response
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'attachment; filename="audio.mp3"',
      },
    });
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    return NextResponse.json(
      { error: 'Failed to generate audio.' },
      { status: 500 }
    );
  }
}







