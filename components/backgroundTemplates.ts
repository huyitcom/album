export interface BackgroundTemplate {
  id: string;
  name: string;
  name_vn: string;
  thumbnailUrl: string;
  prompt: string;
}

export const backgroundTemplates: BackgroundTemplate[] = [
    {
        id: 'floral-arch-door',
        name: 'Floral Arch Doorway',
        name_vn: 'Cổng hoa',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background1.jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into A magnificent, ornate arched doorway of a stately building, lavishly adorned with a voluminous floral garland. The garland features a romantic blend of lush blush pink garden roses, smaller spray roses, and large, fluffy creamy white dahlias, interspersed with rich, dark green foliage (such as eucalyptus or ferns). The floral arrangement follows the entire arch, extending generously down both sides of the entrance, and culminates in two large, symmetrical floral arrangements flanking the base of the doorway. The doorway itself consists of double, dark, rich brown wooden doors with intricate carved panels and classic dark metal door handles/knobs. The arch is framed by light-colored stone or stucco, suggesting classic architectural details. The ground in front is a natural stone pathway, gently scattered with creamy white and pale pink rose petals. A few delicate petals appear to be floating or falling in the air, adding a whimsical touch. The scene is bathed in bright, soft natural daylight, creating gentle highlights and shadows that enhance texture and depth. The overall aesthetic is romantic, elegant, luxurious, and inviting.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'indoor-curtain-arch',
        name: 'Indoor Curtain Arch',
        name_vn: 'Cổng trong nhà',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background3.jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into an elegant indoor wedding ceremony backdrop. A beautiful arch is heavily decorated with white and cream roses and abundant green foliage. Two large white classical urns with matching floral arrangements stand on either side. The floor is white and strewn with white petals. In the background, soft, sheer white curtains are backlit by gentle sunlight, creating a dreamy and romantic atmosphere. Several white pillar candles are lit on the floor, adding to the warm ambiance.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'grand-window-room',
        name: 'Grand Window Room',
        name_vn: 'Phòng cửa sổ lớn',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background2.jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into A grand, elegantly lit interior hall with a pristine, bright aesthetic. The central focus is a magnificent, tall, vertical display featuring objects positioned directly in front of a vast, ornate arched window. This window features intricate leaded glass detailing in the upper fanlight section, with multiple clear panes below, allowing abundant natural light to flood the space. The window is flanked by classical fluted columns with detailed golden Corinthian capitals, all set within a beautifully molded archway. The walls are smooth, rendered in a pristine palette of creamy white, ivory, and soft beige tones. The polished floor, also in light cream or white, reflects the bright light, creating a luminous and expansive feel. Sunlight streams through the window, casting soft, elongated shadows and bright highlights on the floor and architecture. The overall atmosphere is one of serene grandeur, classical elegance, and bright sophistication, reminiscent of a luxurious event space or neo-classical palace. The composition is centered, emphasizing the height and luminosity of the scene, with the [NEW SUBJECT] serving as the vibrant focal point against the softly lit architectural backdrop. Style: Neoclassical, luxurious, ethereal, bright, high-key photography, architectural elegance. Colors: Predominantly cream, ivory, soft white, pale gold accents, subtle warm undertones, with natural greens and soft blushes or colors complementary to the object.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Song Hỷ',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background4.jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that have setting featuring A large, central three-dimensional structure of "double happiness" (囍) symbol is meticulously wrapped in rich, deep red satin fabric. The fabric exhibits elegant, soft folds and subtle creases, creating a luxurious, slightly ruffled texture and enhancing its three-dimensionality. Two vibrant floral arrangements adorn this red structure: one is positioned at its top-left, and the other at its bottom-right. Each arrangement features a lavish mix of crimson and scarlet flowers (such as small poinsettias or wild strawberries), delicate white or cream blossoms (like jasmine or tiny apple blossoms), clusters of bright red berries, and abundant dark green pine-like foliage. These bouquets possess depth and natural layering. Numerous individual red flower petals are scattered throughout the scene, some gently floating in the mid-air around the central red form, and a higher concentration softly resting on the ground in the bottom half of the frame. The petals are depicted with subtle variations in shape and orientation, suggesting natural movement. The background is a clean, warm, and uniform light beige or off-white, providing a neutral canvas that makes the red and green elements pop. The lighting is soft, diffuse, and even, casting gentle shadows that define the contours of the fabric-wrapped form and the textures of the floral arrangements, creating a refined and celebratory atmosphere. The overall composition is balanced and elegant, with the main subject prominently centered. The perspective is eye-level to slightly elevated, looking down just enough to show the scattered petals on the ground.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Trái tim hồng',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background5.jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that A breathtaking, romantic landscape designed to embody the essence of love and devotion, perfect for a Valentine's Day setting. The scene is set in a vast field of delicate pink cherry blossoms, with soft petals gently swaying in the breeze. The entire landscape is immersed in a romantic pink hue, with rolling hills and distant mountains in the background, adding depth to the composition. The sky is a brilliant azure blue, scattered with fluffy white clouds, illuminated by the golden rays of the sun, casting a warm, ethereal glow over the scenery. At the center, a magnificent floral heart sculpture made entirely of vibrant pink blossoms stands as a grand centerpiece, symbolizing eternal love. The heart is adorned with delicate white butterflies, their wings shimmering in the sunlight as they flutter gracefully in the air. More pink butterflies fill the sky, creating a sense of movement and magic. The foreground is filled with blooming rose bushes and cherry blossom branches, framing the scene perfectly and adding an extra layer of depth to the composition. The soft-focus effect on the flowers in the foreground enhances the dreamy aesthetic of the scene. Everything in the image is designed to evoke an overwhelming sense of love, warmth, and happiness, making it the perfect setting for a romantic Valentine's Day celebration—an unforgettable paradise of beauty and passion
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Nền đen kim tuyến',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background6.jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that features a dramatic and deep sense of space. A powerful, defined, and volumetric light ray originates from the top-center, extending downwards and slightly fanning out, dramatically cutting through the scene and illuminating floating particles. The light source itself is unseen, implied to be off-frame. The bottom third of the image is dominated by a dense, horizontal band of finely textured, glowing glitter, resembling a magical ground or surface. The mid-ground is densely filled with numerous bokeh circles and sparkling particulate matter, varying significantly in size from large, soft-focus spheres to tiny, pinprick glimmers. The upper-left quadrant is intentionally left relatively clear to accommodate a potential main subject, while still interacting with the overall atmospheric effects. The composition should convey profound depth and a sense of wonder.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Nền đen huyền ảo',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background7.jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that have detailed, atmospheric cosmic dreamscape featuring a dramatic, ethereal beam of light originating from the top center and fanning downwards through a dark, deep indigo-blue and black starry night sky. Countless small, shimmering white and silver star-like dust particles are scattered across the entire image, appearing denser and more luminous within the celestial light beam. Some larger, brighter star glints are also present, adding depth to the starry field. The overall style is dreamy, romantic, and enchanting, with a soft, glowing ambiance.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Nơ trắng hoa',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (1).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a beautiful, grand backdrop featuring a gigantic, luxurious fabric bow in white, adorned with small, delicate 3D appliqué pastel flowers. This bow serves as an exquisite, elegant setting for the couple, draping elegantly behind and around them without overpowering their presence. The fabric has a smooth, lustrous texture (silk, satin). The background is a seamless, high-key studio backdrop in a very light, warm off-white or cream. Delicate clusters of realistic wild-style flowers and greenery in complementary pastel tones appear on the ground plane, subtly enhancing the scene. The couple should be prominently featured, taking up a significant portion of the frame, well-integrated with the grandeur of the bow. The image is illuminated by soft, diffused, and even studio lighting that creates subtle shadows and gentle highlights, emphasizing the curves and dimensionality of the main subject. The couple should be prominently featured, taking up a significant portion of the frame, well-integrated with the grandeur of the background.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
   },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Ngôi nhà bươm bướm',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (2).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that featuring Monochromatic white ethereal scene, archways, abundant white flowers and branches, numerous white butterflies, soft lighting, serene, dreamy, elegant, wedding aesthetic, ultra realistic.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Cổng hoa và bướm',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (3).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that featuring a multi-tiered white circular podium or stage, suggesting a display platform. Behind this podium, there's a backdrop of white architectural arches, creating a sense of depth and elegance. The overall color scheme is predominantly white and light grey, contributing to a clean, serene, and almost heavenly atmosphere, What makes the image truly enchanting is the abundant natural elements: Delicate white flowering branches (resembling cherry blossoms or baby's breath) are artfully draped around and through the arches, as well as surrounding the base of the podium. These blossoms add texture and a soft, organic feel to the stark white architecture, Interspersed with the white flowers are clusters of light pink flowers, providing a gentle pop of color and warmth, Numerous butterflies in shades of white and soft pink are scattered throughout the scene, some appearing to fly, others resting on the branches and podium. They enhance the magical and whimsical quality of the image, suggesting movement and life. The lighting appears soft and even, highlighting the clean lines of the architecture and the delicate details of the flowers and butterflies.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Hoàng hôn tím',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (5).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that featuring a dreamy landscape, large arch covered in purple wisteria flowers, flying butterflies, sunset sky with purple and pink clouds, calm lake, mountains in background, serene, magical atmosphere, ultra realistic.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Cổng hoa trắng',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (9).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that featuring A breathtakingly ethereal and serene architectural fantasy scene. A grand, classical hallway stretches into the distance, lined with elegant white columns and majestic arches. The entire space is bathed in brilliant, soft, diffused light, emanating from a distant, unseen opening at the end of the hall, creating a strong sense of depth and a luminous, high-key atmosphere. Abundant, delicate white blossoms with subtle greenish-yellow centers cascade throughout the scene. These flowers form dense, voluminous bushes and soft, conical piles along the base of the columns and the sides of the pathway, resembling stylized floral snowdrifts. Slender, dark branches heavily laden with these white blossoms gracefully extend into the foreground and upper portions of the frame, framing the arched pathways. Some individual petals appear to gently float or fall, caught in the light. The dominant color palette is pure white, off-white, and very light grey, with subtle cool undertones of pale blue in the distant light and on the polished floor. The white architecture features intricate, baroque-inspired relief carvings on the high arches and ceiling, adding texture and grandeur. Strong, clear sunlight casts crisp, artistic shadows of the floral branches and architectural details onto the pale, reflective floor, adding depth, rhythm, and visual interest. The composition features a slightly low-angle perspective, emphasizing the grandeur of the architecture and the overwhelming beauty of the blossoms. The receding arches and layered floral arrangements create strong leading lines, drawing the eye towards the bright, mystical vanishing point. The overall style is hyperrealistic yet dreamlike and fantastical, focusing on delicate textures, soft, cinematic lighting, and a feeling of pristine tranquility.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Cổng hoa hoàng hôn',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (10).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that featuring a breathtaking, romantic backdrop featuring a majestic floral archway, richly adorned with lush pastel pink roses, lavender, and various purple blossoms. This vibrant archway stands prominently behind the couple, framing them beautifully. The background opens up to a serene, still body of water, leading to a soft, glowing horizon under a sky painted with gentle blues, purples, lavenders, and blush pinks, suggesting dawn or twilight. Numerous vibrant purple and pink butterflies flutter around the arch and above the water. Delicate, blossoming tree branches extend from the top corners of the frame, adding depth. The water's edge is adorned with dense, flowering flora, and the reflective water surface mirrors the pastel hues. The couple should be prominently positioned in the foreground, large and clearly visible, making them the central focus of this dreamy and tranquil scene. The aesthetic is fantasycore and romantic, with diffused, magical lighting.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Thiên đường',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (11).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that features a magnificent, ethereal classical interior. The couple should be very large, filling the majority of the vertical frame, from near the bottom edge to just below the top, making them the absolute central and dominant focus. They stand gracefully on a highly reflective white marble floor, which is dramatically filled with soft, billowy white cumulus clouds. In the background, three tall, arched windows look out onto a sky filled with more white clouds, allowing bright, atmospheric light and dramatic shafts of warm sunlight to stream into the room. The walls and ornate ceiling display intricate white classical plasterwork. The overall aesthetic is pristine, immersive, and otherworldly, with a strong sense of depth.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Cổng hoa trắng',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (12).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that features A grand, opulent archway meticulously adorned with an abundance of pristine white floral arrangements, primarily featuring dense clusters of white cherry blossoms, delicate baby's breath, and full, elegant white hydrangeas and roses, creating a lush, cascading, and voluminous effect. Numerous ethereal white and cream-colored butterflies are gracefully scattered throughout the floral arch and artfully fluttering around it, some appearing to ascend or descend. The arch frames an empty, serene space. To the left, a classic, off-white paneled wall with subtle architectural molding. To the right, tall, arched windows with sheer, translucent white curtains allow diffused, bright natural light to stream in, creating a soft glow. The floor is a seamless, luminous white, reflecting some of the light and casting subtle, elongated shadows. The overall lighting is high-key, soft, and volumetric, generating a dreamlike, airy, and elegant atmosphere with gentle backlighting from the windows. The color palette is monochromatic, dominated by pure whites, creams, ivories, and subtle off-whites, with minimal warm beige or light grey undertones in the shadows and butterfly wings. The composition is wide, with the magnificent floral arch serving as the central, dominant element, perfectly framing the empty space within. The arch extends from the floor on both sides, meeting at the top, creating a visually symmetrical yet dynamic focal point. The delicate details of each petal and butterfly wing are rendered in ultra-high resolution with a photorealistic, award-winning quality.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Cổng hoa thiên đường',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (20).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that features A grand, classical white architectural archway, heavily adorned and overflowing with abundant, delicate white blossoms and lush, subtle green foliage. The arch is centered in the frame, serving as a majestic gateway. Beyond the arch, a vibrant, clear light blue sky with soft, wispy white clouds stretches across the background. Through the archway, a distant landscape reveals pristine white steps leading up to an elevated platform, surrounded by fields of more delicate white flowers and foliage, creating a sense of depth and a serene horizon.
3. Crucially, you must create a Medium-full shot photorealistic final image of the subject(s), prominently featured to occupy 75% of the frame's height. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Cỏ xanh',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (15).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that features The couple is positioned slightly off-center, with ample bright, natural light on their faces and attire. The background is a lush, vibrant green field with softly blurred trees and foliage, indicating a shallow depth of field (bokeh) that keeps the couple sharply in focus. The lighting is warm and soft, suggestive of a golden hour, with the sun gently backlighting the bride's veil, creating a luminous, ethereal effect. The overall mood is tender, serene, and deeply romantic. The colors are dominated by vibrant greens, pristine whites, warm skin tones, and subtle blacks.
3. Crucially, you must create a photorealistic final image. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Bãi biển hoàng hôn',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (19).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that features a serene beach at either sunrise or sunset. The sky is a stunning gradient of soft blues at the top, transitioning into warm oranges, pinks, and purples towards the horizon, illuminated by a radiant, glowing sun slightly above the horizon, casting a bright reflection path across the water. Fluffy, voluminous cumulus clouds are scattered across the sky, catching the warm light with their undersides. A delicate crescent moon, subtly glowing, is visible high in the sky. Gentle ocean waves roll onto a sandy beach, leaving foamy white surf. In the immediate foreground, vibrant white and pink daisy-like flowers with green foliage are artfully arranged along the edge of the sand, adding a touch of natural beauty and color. The sandy beach shows subtle footprints. The overall mood is tranquil, romantic, and ethereal, with soft, natural lighting and a dreamlike quality
3. Crucially, you must create a Medium-full shot photorealistic final image of the subject(s), prominently featured to occupy 75% of the frame's height. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Cổng hoa gương',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (25).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that features A tranquil and ethereal outdoor setting with prominent classical architectural elements. The scene features two large, elegant white arched structures, reminiscent of Roman or Greek architecture, framing a central view. Abundant clusters of delicate white cherry blossoms (or similar white flowers) with subtle green foliage are gracefully draped over and around these arches, extending into the foreground and sides of the frame. The ground beneath is a highly reflective, polished marble or water surface, mirroring the blue sky, white clouds, and the white blossoms above. In the background, visible through the arches, is a bright, clear blue sky dotted with soft, fluffy white cumulus clouds. Below the horizon line, a calm, expansive body of water (or a reflective floor extending to the horizon) perfectly mirrors the sky. The lighting is bright, soft, and natural, creating subtle highlights and shadows that emphasize the pristine white elements. The overall aesthetic is clean, dreamlike, and romantic, evoking a sense of purity and calmness
3. Crucially, you must create a Medium-full shot photorealistic final image of the subject(s), prominently featured to occupy 75% of the frame's height. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.
4. Make sure the subject(s) size 75% of the frame's height, the background is only serving as a grand and heavenly backdrop for the subject(s)`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Vải lụa hoa',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (26).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that features An elegant and lush wedding or event decor setup, captured from a medium-low perspective, emphasizing abundance and natural sophistication. The background features a soft, flowing backdrop of pristine white or off-white fabric drapes, artfully gathered and draped with a prominent central U-shaped swag, framed by vertical folds on either side. From the top of the drapes, graceful strands of dark green foliage, resembling weeping willow branches, cascade downwards, adding a natural and organic touch. On the far left, natural outdoor light illuminates a glimpse of green trees and foliage, suggesting an open-air or semi-outdoor venue. In the midground, a long banquet table, covered with a crisp white tablecloth, is adorned with an extensive and opulent display of fresh floral arrangements. These arrangements are predominantly white and off-white, showcasing a rich variety of blooms including full white roses, fluffy hydrangeas, dense dahlias, and delicate smaller white blossoms. They are generously interspersed with touches of fresh light green and chartreuse foliage and flowers, such as ornamental cabbage or textured green leaves, providing subtle color variation. The floral displays are dense, lush, and continuous, forming a celebratory garland across the entire length of the table. Towards the right, the table covering transitions to a simpler, plain light grey or white surface. Below the table, at ground level, are large, rectangular arrangements of dense dark green foliage heavily studded with small white flowers, resembling elegant flower boxes or planters that complement the table decor. The foreground consists of a dark grey, subtly textured ground surface, appearing like stone or concrete paving, with faint lighter striations and specks. Small, natural clusters of white and light green flowers nestled within dark green foliage are also scattered directly on the ground in the foreground, mirroring the grander arrangements above. The overall aesthetic is one of sophisticated natural elegance, with a romantic, fresh, and serene ambiance. The dominant color palette is pure whites, creams, light greens, and deep greens, creating a harmonious and monochromatic feel. The lighting is soft, natural, and diffused, indicative of a bright daytime setting, casting gentle shadows that enhance the textures of the fabric and flowers. This image should be rendered in a high-resolution, professional photography style.
3. Crucially, you must create a Medium-full shot photorealistic final image of the subject(s), prominently featured to occupy 75% of the frame's height. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.
4. Make sure the subject(s) size 75% of the frame's height, the background is only serving as a grand and heavenly backdrop for the subject(s)`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Vải lụa hoa',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (27).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that features A vibrant and ethereal landscape photograph capturing a sunrise over a vast, dense sea of mist and clouds. In the foreground, a verdant, dew-kissed grassy hillside slopes diagonally from the lower-left to the mid-right, showcasing rich green and subtle earthy tones. The midground reveals the tops of dark, silhouetted pine trees, partially submerged and softly outlined by a thick, glowing blanket of golden-orange and pale pink fog that fills the valleys. Dominating the background is a brilliant, intensely radiant sun, mostly obscured by the pervasive mist, creating an overwhelming source of warm, golden light that bathes the entire scene in a luminous haze. The sky directly above the sun is brilliant white, fading into soft peach, orange, and delicate pale blue towards the top. The overall style is dreamlike and serene, characterized by soft, diffused light, a palette of warm, glowing colors (gold, orange, peach), contrasting with the cooler tones in the sky and the deep greens of the grass. The composition features strong diagonal lines and layered depth, leading the eye towards the central, awe-inspiring light source and the expansive, mystical fog-laden vista, evoking a sense of wonder and tranquility.
3. Crucially, you must create a Medium-full shot photorealistic final image of the subject(s), prominently featured to occupy 75% of the frame's height. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.
4. Make sure the subject(s) size 75% of the frame's height, the background is only serving as a grand and heavenly backdrop for the subject(s)`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Vải lụa hoa',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (28).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that features A tranquil natural scene comprising a vast, meticulously maintained, vibrant green lawn occupying the foreground and lower two-thirds of the image. The grass surface should show subtle, soft-focus light orbs (bokeh/dust motes) in the immediate foreground. In the midground, a dark, gently winding asphalt path or road horizontally traverses the scene, acting as a soft separator. Beyond the road, a dense, extensive forest of tall, slender pine trees fills the entire background, with their dark, vertical trunks and rich green canopies receding into the distance.
3. Crucially, you must create a Medium-full shot photorealistic final image of the subject(s), prominently featured to occupy 75% of the frame's height. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.
4. Make sure the subject(s) size 75% of the frame's height, the background is only serving as a grand and heavenly backdrop for the subject(s)`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Vải lụa hoa',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (29).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that features a serene, ethereal forest landscape during either sunrise or sunset (golden hour). The composition features a vibrant, lush green grass field in the immediate foreground, meticulously detailed with individual blades and subtle dew drops, reflecting the warm, low-angle light. Several prominent, tall, slender conifer tree trunks (like pines, firs, or spruces) with dark, textured bark stand in the left and central foreground, sharp and in precise focus. Long, dramatic shadows from these foreground trees stretch diagonally across the verdant grass, creating strong lines and depth. The midground and background are dominated by a thick, soft, atmospheric mist or fog, through which more identical tree trunks recede into the distance. These background trees become progressively less defined and more silhouetted, their forms softened and diffused by the pervasive haze. The mist itself glows with a warm, diffused light, appearing soft white, pale yellow, and light beige, creating a luminous, dreamlike quality that obscures the horizon.
3. Crucially, you must create a Medium-full shot photorealistic final image of the subject(s), prominently featured to occupy 75% of the frame's height. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.
4. Make sure the subject(s) size 75% of the frame's height, the background is only serving as a grand and heavenly backdrop for the subject(s)`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Vải lụa hoa',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (30).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that features A serene, winding asphalt road cuts through a dense forest of towering pine trees, bathed in bright, dappled sunlight. The road, featuring faint white dashed lines, curves gently into the distant soft-focus woods, creating strong leading lines that draw the eye into the depth of the image. Lush, vibrant green grass and undergrowth carpet the forest floor on both sides of the road, glistening with areas of direct sunlight and deep shadows. Tall, straight pine trunks with rough, textured bark stand like sentinels, forming a natural, almost symmetrical tunnel or corridor. The lighting is natural daylight, with strong, sharp shadows cast by the trees onto the road and grass, indicating a high sun angle. The overall style is photo-realistic with a high dynamic range, featuring a shallow depth of field; the foreground (road, nearest grass, and tree trunks) is sharply in focus, while the background (distant trees and road) dissolves into a pleasing, soft bokeh, enhancing the sense of depth and tranquility. The dominant colors are rich, verdant greens (pine needles, grass), earthy browns (tree trunks, fallen debris), and dark greys/blacks (asphalt), punctuated by bright patches of sunlight. The atmosphere is peaceful, inviting, and tranquil, capturing the quiet beauty of a forest road. This entire scene and aesthetic should serve as the backdrop and visual style for the primary subject from the input image, integrating [primary subject from input image] seamlessly into this specific environment, composition, and lighting.
3. Crucially, you must create a Medium-full shot photorealistic final image of the subject(s), prominently featured to occupy 75% of the frame's height. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.
4. Make sure the subject(s) size 75% of the frame's height, the background is only serving as a grand and heavenly backdrop for the subject(s)`,
    },
    {
        id: 'double-happiness',
        name: 'Double Happiness',
        name_vn: 'Vải lụa hoa',
        thumbnailUrl: 'https://photobookvietnam.net/app/images/background (31).jpg',
        prompt: `ROLE: Professional Photo Editor.
TASK: Your task is to expertly replace the background of the first image (the original subject). You must meticulously cut out the subject and place it seamlessly into the new background.
INSTRUCTIONS:
1. Identify and isolate the primary subject(s) from the first image.
2. Place the isolated subject(s) into a background that features Dominating the left and central background is a grand, multi-tiered waterfall, cascading forcefully down a towering, dark, moss-covered rock cliff. The water appears white and frothy, creating a soft mist at its base. The top of the cliff and the surrounding areas are densely covered with lush, dark green foliage, suggesting a rich, tropical forest environment. The sky above is a soft, overcast light grey, providing a diffused and ethereal illumination. The ground in the foreground is covered with vibrant, well-maintained green grass. Numerous beds of brightly colored flowers, predominantly rich orange and warm yellow roses, are arranged in pleasing clusters along the bottom and right side of the frame, leading the eye towards the subject and the waterfall's base. To the left of the subject and extending towards the waterfall, there's a large, artistic floral arch or structure, heavily adorned with similar orange and yellow flowers interwoven with abundant dark green foliage, creating a celebratory and natural altar-like setting.
3. Crucially, you must create a Medium-full shot photorealistic final image of the subject(s), prominently featured to occupy 75% of the frame's height. This means harmonizing lighting, shadows, color grading, and perspective between the subject and the new background. The final result should look like a single, professionally taken photograph, not a composite.
4. Make sure the subject(s) size 75% of the frame's height, the background is only serving as a grand and heavenly backdrop for the subject(s)`,
    }


    
];
