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

    // Retrieve the Base64-encoded credentials from environment variables
    const credentialsBase64 = process.env.GOOGLE_CREDENTIALS;
    if (!credentialsBase64) {
      throw new Error('Google credentials are not configured.');
    }

    // Decode the Base64 string to JSON
    const credentialsJson = Buffer.from(credentialsBase64, 'base64').toString('utf-8');
    const credentials = JSON.parse(credentialsJson);

    // Initialize the Text-to-Speech client with the decoded credentials
    const client = new TextToSpeechClient({ credentials });

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





