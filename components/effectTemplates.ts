export interface EffectTemplate {
  id: string;
  name: string;
  name_vn: string;
  thumbnailUrl: string;
  prompt: string;
}

export const effectTemplates: EffectTemplate[] = [
    {
        id: 'watercolor',
        name: 'indoor Lighting',
        name_vn: 'Ánh sáng trong phòng',
       thumbnailUrl: 'https://canvasvietnam.com/images/effect1.jpg',
        prompt: `
            **ROLE: Professional Photo Editor.**
            **TASK:** Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
            **INSTRUCTIONS:**
            1.  Identify and isolate the primary subject(s) from the first image.
            2.  Place the isolated subject(s) into the new context placing the subject into a new background described as: "Window light soft glow, natural daylight streaming through, soft highlights on hair and clothes, gentle shadows. Curtain diffused light, sunlight filtered through sheer curtains, warm and intimate indoor mood. Lamp warm glow, cozy golden highlights on hair, face and outfit, evening atmosphere. Ceiling light downcast, overhead illumination creating shadows under eyes and nose, dramatic indoor look. Chandelier sparkle, elegant highlights on hair and outfit, luxurious atmosphere. TV or screen glow, cool bluish light on face and clothes, cinematic night mood. Fireplace flicker, warm flickering highlights on hair and outfit, soft dancing shadows on walls. Candlelight intimacy, golden flickering glow on face, subtle reflections on clothes, romantic vintage vibe. Kitchen fluorescent light, harsh cool tones, flat shadows, realistic everyday atmosphere. Indoor spotlight, focused beam illuminating subject, dramatic contrast, theatrical mood".
            3.  **Crucially, you must create a photorealistic final image.** This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.
       `,
    },
    {
        id: 'oil-painting',
        name: 'Gold hour lighting',
        name_vn: 'Giả nắng giờ vàng',
        thumbnailUrl: 'https://canvasvietnam.com/images/effect2.jpg',
        prompt: `
            **ROLE: Professional Photo Editor.**
            **TASK:** Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
            **INSTRUCTIONS:**
            1.  Identify and isolate the primary subject(s) from the first image.
            2.  Place the isolated subject(s) into the new context placing the subject into a new background described as: "Golden hour backlighting with warm tones, soft rim light outlining hair, clothing, and contours of the subject. Gentle lens flare from the sunlight enhances the dreamy mood, while long natural shadows fall across the ground for depth and realism.".
            3.  **Crucially, you must create a photorealistic final image.** This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.
        `,
    },
    {
        id: 'pop-art',
        name: 'Fog',
        name_vn: 'Sương mù',
        thumbnailUrl: 'https://canvasvietnam.com/images/effect3.jpg',
        prompt: `
            **ROLE: Professional Photo Editor.**
            **TASK:** Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
            **INSTRUCTIONS:**
            1.  Identify and isolate the primary subject(s) from the first image.
            2.  Place the isolated subject(s) into the new context placing the subject into a new background described as: "Fill the entire scene with extremely thick, impenetrable fog. The mist should be so dense that it almost completely erases the background and surroundings, leaving only faint, ghostly silhouettes barely visible in the distance. The atmosphere must feel heavy, overwhelming, and otherworldly, with layers of fog pressing against the scene like a white-gray curtain. The main subject in the foreground remains sharp and clear, while everything else is swallowed by the massive wall of fog. Hyper-cinematic, highly atmospheric, ultra-detailed, surreal".
            3.  **Crucially, you must create a photorealistic final image.** This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.
        `,
    },
    {
        id: 'fantasy-dreamy',
        name: 'Snow',
        name_vn: 'Tuyết rơi',
        thumbnailUrl: 'https://canvasvietnam.com/images/effect4.jpg',
        prompt: `
            **ROLE: Professional Photo Editor.**
            **TASK:** Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
            **INSTRUCTIONS:**
            1.  Identify and isolate the primary subject(s) from the first image.
            2.  Place the isolated subject(s) into the new context placing the subject into a new background described as: "Snowfall scene with soft white snowflakes gently falling through the air, snow resting on hair, clothing, and surrounding environment. Cold bluish ambient tones with soft diffused light, creating a serene winter atmosphere. Subtle highlights on frosty textures, misty breath visible in the air.".
            3.  **Crucially, you must create a photorealistic final image.** This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.
        `,
    },
    {
        id: 'cyberpunk-neon',
        name: 'Indoor Window Shadow',
        name_vn: 'Ánh sáng qua cửa sổ',
        thumbnailUrl: 'https://canvasvietnam.com/images/effect5.jpg',
        prompt: `
            **ROLE: Professional Photo Editor.**
            **TASK:** Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
            **INSTRUCTIONS:**
            1.  Identify and isolate the primary subject(s) from the first image.
            2.  Place the isolated subject(s) into the new context placing the subject into a new background described as: "Golden hour sunlight filtered through window blinds, striped light patterns across face, hair, and clothes, dramatic shadows on the wall".
            3.  **Crucially, you must create a photorealistic final image.** This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.
        `,
    },
    {
        id: 'cyberpunk-neon',
        name: 'Night lighting',
        name_vn: 'Ánh sáng ban đêm',
        thumbnailUrl: 'https://canvasvietnam.com/images/effect6.jpg',
        prompt: `
            **ROLE: Professional Photo Editor.**
            **TASK:** Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
            **INSTRUCTIONS:**
            1.  Identify and isolate the primary subject(s) from the first image.
            2.  Place the isolated subject(s) into the new context placing the subject into a new background described as: "- Streetlight glow, warm yellow-orange pools of light, scattered shadows on the ground. Neon cinematic lighting, pink and blue reflections on skin and clothes. Soft moonlight, bluish tones, gentle shadows, calm night mood. Harsh on-camera flash at night, subject brightly lit, dark background. Car headlight backlight, strong rim light, atmospheric haze and smoke. Lantern warm glow, soft golden light, vintage magical mood".
            3.  **Crucially, you must create a photorealistic final image.** This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.
        `,
    },
    {
        id: 'cyberpunk-neon',
        name: 'Sunset lighting',
        name_vn: 'Hoàng hôn',
        thumbnailUrl: 'https://canvasvietnam.com/images/effect7.jpg',
        prompt: `
            **ROLE: Professional Photo Editor.**
            **TASK:** Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
            **INSTRUCTIONS:**
            1.  Identify and isolate the primary subject(s) from the first image.
            2.  Place the isolated subject(s) into the new context placing the subject into a new background described as: "Golden hour warm backlight, glowing orange tones, long soft shadows. Blue hour ambient light, cool and dreamy atmosphere, soft gradient sky. Artistic sun flare, lens flare streaks, cinematic glow. Split light sunset, half illuminated face, dramatic shadow contrast".
            3.  **Crucially, you must create a photorealistic final image.** This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.
        `,
    },
];
