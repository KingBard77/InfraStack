import { StudioMaxGraphAdapter } from '../library/studio-maxgraph.js';

const InfraStackLayoutShareImage = (function () {
    const width = 1200;
    const height = 1200;
    const diagram = { x: 45, y: 150, width: 1110, height: 980 };

    function roundedRect(context, x, y, boxWidth, boxHeight, radius) {
        context.beginPath();
        context.roundRect(x, y, boxWidth, boxHeight, radius);
    }

    function wrapText(context, text, x, y, maxWidth, lineHeight, maxLines) {
        const words = String(text || '').split(/\s+/).filter(Boolean);
        const lines = [];
        let current = '';
        words.forEach(function (word) {
            const candidate = current ? `${current} ${word}` : word;
            if (current && context.measureText(candidate).width > maxWidth) {
                lines.push(current);
                current = word;
            } else {
                current = candidate;
            }
        });
        if (current) lines.push(current);
        lines.slice(0, maxLines).forEach(function (line, index) {
            const suffix = index === maxLines - 1 && lines.length > maxLines ? '…' : '';
            context.fillText(`${line}${suffix}`, x, y + (index * lineHeight));
        });
    }

    function nextFrame() {
        return new Promise(function (resolve) { window.requestAnimationFrame(resolve); });
    }

    function loadImage(url) {
        return new Promise(function (resolve, reject) {
            const image = new Image();
            image.onload = function () { resolve(image); };
            image.onerror = function () { reject(new Error('The shared diagram export could not be decoded.')); };
            image.src = url;
        });
    }

    function blobDataUrl(blob) {
        return new Promise(function (resolve, reject) {
            const reader = new FileReader();
            reader.onload = function () { resolve(String(reader.result || '')); };
            reader.onerror = function () { reject(new Error('A diagram image could not be embedded.')); };
            reader.readAsDataURL(blob);
        });
    }

    async function embeddedUrl(url) {
        if (!url || url.startsWith('data:')) return url;
        try {
            const response = await fetch(url);
            if (!response.ok) return url;
            return await blobDataUrl(await response.blob());
        } catch (error) {
            return url;
        }
    }

    async function inlineSvgImages(svg) {
        await Promise.all(Array.from(svg.querySelectorAll('img, image')).map(async function (image) {
            const source = image.getAttribute('src') || image.getAttribute('href') || image.getAttribute('xlink:href');
            const embedded = await embeddedUrl(source);
            if (!embedded || embedded === source) return;
            if (image.localName === 'img') image.setAttribute('src', embedded);
            else image.setAttribute('href', embedded);
        }));
    }

    async function renderMaxGraphDiagram(project, view, iconUrls) {
        const host = document.createElement('div');
        const graph = document.createElement('div');
        const outline = document.createElement('div');
        host.style.cssText = `position:fixed;z-index:-1;top:0;left:-20000px;width:${diagram.width}px;height:${diagram.height}px;overflow:hidden;pointer-events:none`;
        graph.className = 'studio-graph';
        graph.style.inset = '0';
        outline.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden';
        host.append(graph, outline);
        document.body.append(host);
        const adapter = new StudioMaxGraphAdapter(graph, outline);
        try {
            adapter.setReadOnly(true);
            adapter.render(project, view, iconUrls);
            if (document.fonts?.ready) await document.fonts.ready;
            await nextFrame();
            adapter.fit();
            await nextFrame();
            await nextFrame();
            const svg = adapter.exportSvg(diagram.width, diagram.height);
            await inlineSvgImages(svg);
            const source = new XMLSerializer().serializeToString(svg);
            const url = URL.createObjectURL(new Blob([source], { type: 'image/svg+xml;charset=utf-8' }));
            try {
                return await loadImage(url);
            } finally {
                URL.revokeObjectURL(url);
            }
        } finally {
            adapter.destroy();
            host.remove();
        }
    }

    /**
     * Creates a static PNG share image from the shared maxGraph presentation.
     *
     * @param {object} project Normalized Studio project.
     * @param {string} view Active architecture projection.
     * @param {object} iconUrls Provider icon URLs keyed by catalogue identity or type.
     * @param {string} introduction Provider-native architecture introduction.
     * @returns {Promise<{blob: Blob, url: string, width: number, height: number}>} Rendered PNG result.
     */
    async function create(project, view, iconUrls, introduction) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');
        const diagramImage = await renderMaxGraphDiagram(project, view, iconUrls);

        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, width, height);
        context.strokeStyle = '#edf1f7';
        context.lineWidth = 1;
        for (let x = 0; x <= width; x += 24) {
            context.beginPath();
            context.moveTo(x, 140);
            context.lineTo(x, 1145);
            context.stroke();
        }
        for (let y = 140; y <= 1145; y += 24) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(width, y);
            context.stroke();
        }

        context.fillStyle = '#172033';
        context.font = '800 34px Nunito, sans-serif';
        context.fillText(project.name || 'InfraStack Architecture', 50, 55);
        context.fillStyle = '#667085';
        context.font = '500 16px Roboto, sans-serif';
        wrapText(context, introduction, 50, 88, 1100, 23, 2);
        context.drawImage(diagramImage, diagram.x, diagram.y, diagram.width, diagram.height);

        context.fillStyle = '#6546ff';
        roundedRect(context, 50, 1158, 18, 18, 5);
        context.fill();
        context.fillStyle = '#172033';
        context.font = '800 15px Nunito, sans-serif';
        context.fillText('InfraStack', 77, 1173);
        context.fillStyle = '#667085';
        context.font = '500 13px Roboto, sans-serif';
        context.textAlign = 'right';
        context.fillText('Static PNG share image · Open the shared link for the interactive read-only architecture.', 1150, 1173);
        context.textAlign = 'left';

        const blob = await new Promise(function (resolve, reject) {
            canvas.toBlob(function (value) {
                if (value) resolve(value);
                else reject(new Error('The share image could not be generated.'));
            }, 'image/png', 0.95);
        });
        return { blob, url: URL.createObjectURL(blob), width, height };
    }

    return { create };
}());

export default InfraStackLayoutShareImage;
