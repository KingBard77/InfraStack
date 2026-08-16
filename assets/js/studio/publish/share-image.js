// share-image.js
const InfraStackLayoutShareImage = (function () {
    const width = 1200;
    const height = 1200;

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

    function loadImage(url) {
        return new Promise(function (resolve) {
            if (!url) {
                resolve(null);
                return;
            }
            const image = new Image();
            image.onload = function () { resolve(image); };
            image.onerror = function () { resolve(null); };
            image.src = url;
        });
    }

    function assetDetail(asset) {
        if (asset.type === 'vpc') return [asset.properties.region, asset.properties.address].filter(Boolean).join(' · ');
        return asset.properties.role || asset.properties.address || asset.category;
    }

    function boundaryStyle(type) {
        return {
            domain: ['#64748b', 'rgba(248, 250, 252, .78)'],
            environment: ['#6366f1', 'rgba(247, 247, 255, .78)'],
            vpc: ['#3b82f6', 'rgba(247, 251, 255, .78)'],
            'availability-zone': ['#38a3d1', 'rgba(248, 252, 255, .72)'],
            subnet: ['#60a5fa', 'rgba(251, 253, 255, .68)'],
            rack: ['#64748b', 'rgba(248, 250, 252, .72)']
        }[type] || ['#94a3b8', 'rgba(248, 250, 252, .72)'];
    }

    function edgeColor(type) {
        return {
            network: '#334155', vpn: '#7c3aed', peering: '#2563eb', trust: '#dc2626',
            api: '#0891b2', replication: '#16a34a', administration: '#d97706'
        }[type] || '#64748b';
    }

    function drawArrow(context, x, y, angle, color) {
        context.save();
        context.translate(x, y);
        context.rotate(angle);
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(-10, -5);
        context.lineTo(-10, 5);
        context.closePath();
        context.fill();
        context.restore();
    }

    /**
     * Creates a static PNG share image from normalized Studio project state.
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
        const visibleAssets = project.assets.filter(function (asset) { return asset.views.includes(view); });
        const visibleIds = new Set(visibleAssets.map(function (asset) { return asset.id; }));
        const assetMap = new Map(visibleAssets.map(function (asset) { return [asset.id, asset]; }));
        const layouts = visibleAssets.map(function (asset) { return asset.layout[view]; });
        const minX = Math.min(...layouts.map(function (layout) { return layout.x; }), 0);
        const minY = Math.min(...layouts.map(function (layout) { return layout.y; }), 0);
        const maxX = Math.max(...layouts.map(function (layout) { return layout.x + layout.width; }), 1);
        const maxY = Math.max(...layouts.map(function (layout) { return layout.y + layout.height; }), 1);
        const diagram = { x: 45, y: 150, width: 1110, height: 980 };
        const scale = Math.min(diagram.width / Math.max(1, maxX - minX), diagram.height / Math.max(1, maxY - minY)) * 0.92;
        const offsetX = diagram.x + ((diagram.width - ((maxX - minX) * scale)) / 2) - (minX * scale);
        const offsetY = diagram.y + ((diagram.height - ((maxY - minY) * scale)) / 2) - (minY * scale);
        const point = function (x, y) { return [offsetX + (x * scale), offsetY + (y * scale)]; };
        const iconEntries = await Promise.all(visibleAssets.filter(function (asset) { return !asset.is_container; }).map(async function (asset) {
            const url = iconUrls[asset.catalog_id] || iconUrls[asset.type] || asset.icon;
            return [asset.id, await loadImage(url)];
        }));
        const images = new Map(iconEntries);

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

        visibleAssets.filter(function (asset) { return asset.is_container; }).sort(function (left, right) {
            const leftLayout = left.layout[view];
            const rightLayout = right.layout[view];
            return (rightLayout.width * rightLayout.height) - (leftLayout.width * leftLayout.height);
        }).forEach(function (asset) {
            const layout = asset.layout[view];
            const [x, y] = point(layout.x, layout.y);
            const boxWidth = layout.width * scale;
            const boxHeight = layout.height * scale;
            const [stroke, fill] = boundaryStyle(asset.type);
            context.save();
            context.fillStyle = fill;
            context.strokeStyle = stroke;
            context.lineWidth = 2;
            if (['environment', 'availability-zone'].includes(asset.type)) context.setLineDash([8, 6]);
            roundedRect(context, x, y, boxWidth, boxHeight, 13);
            context.fill();
            context.stroke();
            context.restore();
            context.fillStyle = '#17324d';
            context.font = `800 ${Math.max(13, 18 * scale)}px Nunito, sans-serif`;
            context.fillText(asset.label, x + 13, y + Math.max(22, 26 * scale));
            context.fillStyle = '#667085';
            context.font = `500 ${Math.max(10, 11 * scale)}px Roboto, sans-serif`;
            context.fillText(assetDetail(asset), x + 13, y + Math.max(38, 43 * scale));
        });

        project.connections.filter(function (connection) {
            return visibleIds.has(connection.source) && visibleIds.has(connection.target);
        }).forEach(function (connection) {
            const source = assetMap.get(connection.source).layout[view];
            const target = assetMap.get(connection.target).layout[view];
            const [sourceX, sourceY] = point(source.x + source.width, source.y + (source.height / 2));
            const [targetX, targetY] = point(target.x, target.y + (target.height / 2));
            const middleX = sourceX + ((targetX - sourceX) / 2);
            const color = edgeColor(connection.type);
            context.save();
            context.strokeStyle = color;
            context.lineWidth = Math.max(2, 3 * scale);
            if (['vpn', 'peering', 'trust', 'administration'].includes(connection.type)) context.setLineDash([10, 7]);
            context.beginPath();
            context.moveTo(sourceX, sourceY);
            context.lineTo(middleX, sourceY);
            context.lineTo(middleX, targetY);
            context.lineTo(targetX, targetY);
            context.stroke();
            context.restore();
            drawArrow(context, targetX, targetY, targetX >= middleX ? 0 : Math.PI, color);
        });

        visibleAssets.filter(function (asset) { return !asset.is_container; }).forEach(function (asset) {
            const layout = asset.layout[view];
            const [x, y] = point(layout.x, layout.y);
            const boxWidth = layout.width * scale;
            const boxHeight = layout.height * scale;
            const iconSize = Math.min(42, Math.max(20, layout.icon_size * scale));
            context.save();
            context.shadowColor = 'rgba(15, 23, 42, .12)';
            context.shadowBlur = 12;
            context.shadowOffsetY = 5;
            context.fillStyle = '#ffffff';
            context.strokeStyle = '#b9c8da';
            context.lineWidth = 1.5;
            roundedRect(context, x, y, boxWidth, boxHeight, 10);
            context.fill();
            context.stroke();
            context.restore();
            const icon = images.get(asset.id);
            if (icon) {
                context.drawImage(icon, x + 10, y + ((boxHeight - iconSize) / 2), iconSize, iconSize);
            } else {
                context.fillStyle = '#eef4ff';
                roundedRect(context, x + 10, y + ((boxHeight - iconSize) / 2), iconSize, iconSize, 6);
                context.fill();
            }
            const textX = x + iconSize + 20;
            context.fillStyle = '#172033';
            context.font = `800 ${Math.max(11, 14 * scale)}px Nunito, sans-serif`;
            wrapText(context, asset.label, textX, y + (boxHeight / 2) - 3, Math.max(50, boxWidth - iconSize - 30), 16, 1);
            context.fillStyle = '#667085';
            context.font = `500 ${Math.max(9, 10 * scale)}px Roboto, sans-serif`;
            wrapText(context, assetDetail(asset), textX, y + (boxHeight / 2) + 14, Math.max(50, boxWidth - iconSize - 30), 13, 1);
        });

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
