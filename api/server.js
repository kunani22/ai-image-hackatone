import { URL } from 'url';

// API 키 검증
const FAL_API_KEY = process.env.FAL_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!FAL_API_KEY || !OPENAI_API_KEY) {
    console.error('❌ 환경변수에서 API 키를 찾을 수 없습니다.');
    console.error('FAL_API_KEY:', FAL_API_KEY ? '설정됨' : '누락');
    console.error('OPENAI_API_KEY:', OPENAI_API_KEY ? '설정됨' : '누락');
}

async function makeRequest(url, options) {
    const { default: fetch } = await import('node-fetch');
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return { ok: response.ok, status: response.status, data };
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
}

export default async function handler(req, res) {
    // CORS 헤더 추가
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const urlObj = new URL(req.url, `https://${req.headers.host}`);
    console.log(`📞 ${req.method} ${urlObj.pathname}`);

    // API 엔드포인트들
    if (urlObj.pathname === '/api/enhance-prompt' && req.method === 'POST') {
        try {
            console.log('📝 Enhancing prompt...');
            const { userInput } = req.body;
            
            console.log('🎯 Original input:', userInput);
            
            const apiResponse = await makeRequest('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        {
                            role: 'system',
                            content: `You are an expert visual prompt engineer for FLUX AI. Transform the user's input into a concise, powerful prompt that generates stunning images.

RULES:
1. Keep it under 75 words for optimal FLUX processing
2. Use specific, vivid visual terms that FLUX understands well
3. Include 2-3 key style/quality descriptors
4. Focus on composition, lighting, and mood
5. Make every word count - no fluff

FLUX-OPTIMIZED KEYWORDS TO USE:
- Style: "cinematic", "photorealistic", "concept art", "digital art", "oil painting"
- Quality: "highly detailed", "sharp focus", "professional photography", "award winning"
- Lighting: "golden hour", "dramatic lighting", "soft natural light", "volumetric lighting"
- Mood: "atmospheric", "moody", "vibrant", "ethereal", "dynamic"

OUTPUT: Return ONLY a concise, powerful prompt that FLUX will interpret perfectly. Make it visually striking but technically precise.`
                        },
                        {
                            role: 'user',
                            content: userInput
                        }
                    ],
                    max_tokens: 400,
                    temperature: 0.9,
                    top_p: 0.95,
                    frequency_penalty: 0.5,
                    presence_penalty: 0.3
                })
            });

            if (!apiResponse.ok) {
                throw new Error(`OpenAI API error: ${apiResponse.status}`);
            }

            const enhancedPrompt = apiResponse.data.choices[0].message.content.trim();
            console.log('✅ Enhanced prompt:', enhancedPrompt);

            res.status(200).json({ enhancedPrompt });
            
        } catch (error) {
            console.error('❌ Error enhancing prompt:', error);
            res.status(500).json({ 
                error: 'Failed to enhance prompt',
                message: error.message 
            });
        }
        return;
    }

    if (urlObj.pathname === '/api/generate-image' && req.method === 'POST') {
        try {
            console.log('🖼️ Generating image...');
            const { prompt } = req.body;
            console.log('📝 Prompt:', prompt);
            
            const apiResponse = await makeRequest('https://fal.run/fal-ai/flux-pro/v1.1-ultra', {
                method: 'POST',
                headers: {
                    'Authorization': `Key ${FAL_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    image_size: "landscape_16_9",
                    num_inference_steps: 28,
                    guidance_scale: 3.5,
                    num_images: 1,
                    enable_safety_checker: true
                })
            });

            if (!apiResponse.ok) {
                throw new Error(`fal.ai API error: ${apiResponse.status}`);
            }

            console.log('✅ Image generated successfully');
            res.status(200).json(apiResponse.data);
            
        } catch (error) {
            console.error('❌ Error generating image:', error);
            res.status(500).json({ 
                error: 'Failed to generate image',
                message: error.message 
            });
        }
        return;
    }

    // 정적 파일 서빙 (index.html)
    if (req.method === 'GET') {
        // Vercel에서는 정적 파일을 자동으로 서빙하므로 리다이렉트
        res.status(200).redirect('/');
        return;
    }

    res.status(404).json({ error: 'Not found' });
}