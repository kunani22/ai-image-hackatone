import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { URL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// API Keys (환경변수에서만 로드)
const FAL_API_KEY = process.env.FAL_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// API 키 검증
if (!FAL_API_KEY || !OPENAI_API_KEY) {
    console.error('❌ 환경변수에서 API 키를 찾을 수 없습니다.');
    console.error('FAL_API_KEY:', FAL_API_KEY ? '설정됨' : '누락');
    console.error('OPENAI_API_KEY:', OPENAI_API_KEY ? '설정됨' : '누락');
    process.exit(1);
}

console.log('🔑 API Keys loaded from environment variables ✅');

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

const server = http.createServer(async (req, res) => {
    // CORS 헤더 추가
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    console.log(`📞 ${req.method} ${urlObj.pathname}`);

    // API 엔드포인트들
    if (urlObj.pathname === '/api/enhance-prompt' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                console.log('📝 Enhancing prompt...');
                const { userInput } = JSON.parse(body);
                
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

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ enhancedPrompt }));
                
            } catch (error) {
                console.error('❌ Error enhancing prompt:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    error: 'Failed to enhance prompt',
                    message: error.message 
                }));
            }
        });
        return;
    }

    if (urlObj.pathname === '/api/generate-image' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                console.log('🖼️ Generating image...');
                const { prompt } = JSON.parse(body);
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
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(apiResponse.data));
                
            } catch (error) {
                console.error('❌ Error generating image:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ 
                    error: 'Failed to generate image',
                    message: error.message 
                }));
            }
        });
        return;
    }

    // 정적 파일 서빙
    let filePath = './index.html';
    
    if (req.url === '/') {
        filePath = './index.html';
    } else {
        filePath = '.' + req.url;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - Page Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`🚀 API 서버가 포트 ${PORT}에서 실행 중입니다!`);
    console.log(`📱 http://localhost:${PORT} 에서 확인하세요.`);
    console.log(`🔌 API 엔드포인트:`);
    console.log(`   - POST /api/enhance-prompt`);
    console.log(`   - POST /api/generate-image`);
    console.log('');
});

export default server;