const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
    return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('Studio Share creates a persisted read-only project instead of sharing the editor URL', () => {
    const studio = read('assets/js/studio/studio.js');
    const page = read('templates/studio/index.html.twig');
    const imageRenderer = read('assets/js/studio/publish/share-image.js');
    const publisher = read('assets/js/studio/publish/share-publish.js');
    const studioCss = read('assets/styles/studio/studio.css');
    assert.match(publisher, /fetch\(options\.root\.dataset\.shareUrl/);
    assert.match(publisher, /options\.core\.buildExportPayload\(project\(\)\)/);
    assert.match(publisher, /result\.share_url/);
    assert.match(publisher, /result\.embed_url/);
    assert.match(publisher, /showModal\(\)/);
    assert.match(page, /id="studio-share-dialog"/);
    assert.match(page, /id="studio-embed-dialog"/);
    assert.match(page, /id="studio-share-whatsapp"/);
    assert.match(page, /id="studio-share-status-text"/);
    assert.doesNotMatch(page, /id="studio-share-copy-link"/);
    assert.doesNotMatch(page, /id="studio-share-open-link"/);
    assert.match(page, /class="studio-share-platforms"/);
    assert.match(page, /class="studio-share-platforms-disclosure"/);
    assert.match(page, /<summary>More sharing options/);
    assert.doesNotMatch(page, /<details class="studio-share-platforms-disclosure" open/);
    assert.match(page, /id="studio-share-x"/);
    assert.match(page, /id="studio-share-facebook"/);
    assert.match(page, /id="studio-share-linkedin"/);
    assert.match(page, /id="studio-share-telegram"/);
    assert.match(page, /id="studio-share-reddit"/);
    assert.match(page, /id="studio-share-email"/);
    assert.match(page, /<img id="studio-share-preview"/);
    assert.match(page, /id="studio-share-copy-image"/);
    assert.match(page, /id="studio-share-download-image"/);
    assert.match(page, /id="studio-share-copy-embed"/);
    assert.doesNotMatch(page, /id="studio-embed-preview"/);
    assert.match(studio, /selectedPackageIntroduction\(\)/);
    assert.match(studio, /layoutPublishFactory\?\.create/);
    assert.match(publisher, /options\.shareImageRenderer\.create/);
    assert.match(publisher, /new ClipboardItem/);
    assert.match(publisher, /download\.download = imageFileName\(\)/);
    assert.match(imageRenderer, /canvas\.width = width/);
    assert.match(imageRenderer, /canvas\.toBlob/);
    assert.match(imageRenderer, /const width = 1200/);
    assert.match(imageRenderer, /const height = 1200/);
    assert.match(imageRenderer, /Static PNG share image/);
    assert.match(imageRenderer, /function fitSingleLine\(context, value, maximumWidth\)/);
    assert.match(imageRenderer, /const relationshipLabel = connection\.label \|\| connection\.protocol \|\| ''/);
    assert.match(imageRenderer, /context\.fillText\(fittedLabel, middleX, labelY\)/);
    assert.match(imageRenderer, /context\.strokeText\(fittedLabel, middleX, labelY\)/);
    assert.doesNotMatch(imageRenderer, /roundedRect\(context, middleX - \(labelWidth \/ 2\)/);
    assert.match(studio, /import shareImageRenderer from '\.\/publish\/share-image\.js'/);
    assert.match(page, /importmap\(\['app', 'studio'\]\)/);
    assert.match(page, /data-embed-focus/);
    assert.match(page, /Continue to WhatsApp/);
    assert.doesNotMatch(page, /class="studio-share-more"/);
    assert.match(page, /id="studio-embed-close"/);
    assert.doesNotMatch(publisher, /shareCopyLink|shareOpenLink|shareOpenEmbed/);
    assert.match(publisher, /elements\.shareReddit\.href/);
    assert.match(publisher, /elements\.shareEmail\.href/);
    assert.match(studioCss, /\.studio-share-platforms/);
    assert.match(studioCss, /\.studio-share-platforms-disclosure\[open\]/);
    assert.doesNotMatch(studioCss, /\.studio-share-platforms\s*\{[^}]*position:\s*absolute/);
    assert.match(publisher, /target\.hidden = !target\.hidden/);
    assert.match(publisher, /button\.setAttribute\('aria-expanded'/);
});

test('share and embed pages use the shared read-only renderer', () => {
    const share = read('templates/layout/share.html.twig');
    const embed = read('templates/layout/embed.html.twig');
    const renderer = read('assets/js/layout/share.js');
    const shareCss = read('assets/styles/layout/share.css');
    const embedCss = read('assets/styles/layout/embed.css');
    assert.match(share, /studio-shared-project-data/);
    assert.match(share, /styles\/layout\/share\.css/);
    assert.match(share, /Studio Result/);
    assert.match(embed, /studio-embedded-page/);
    assert.match(embed, /styles\/layout\/share\.css/);
    assert.match(embed, /styles\/layout\/embed\.css/);
    assert.match(embed, /Made with InfraStack/);
    assert.ok(embed.indexOf('styles/layout/share.css') < embed.indexOf('styles/layout/embed.css'));
    assert.match(shareCss, /\.studio-shared-page/);
    assert.match(embedCss, /\.studio-embed-body/);
    assert.doesNotMatch(embedCss, /\.studio-shared-page\s*\{/);
    assert.match(renderer, /adapter\.setReadOnly\(true\)/);
    assert.match(renderer, /renderInventory\(\)/);
    assert.match(renderer, /renderAdvisory\(\)/);
});

test('all shared layouts use the current InfraStack brand mark', () => {
    const base = read('templates/base.html.twig');
    const header = read('templates/layout/header.html.twig');
    const footer = read('templates/layout/footer.html.twig');
    const embed = read('templates/layout/embed.html.twig');
    const mainCss = read('assets/styles/main.css');
    const currentIcon = 'images/logo/infrastack-icon.png';
    const currentWordmark = 'images/logo/infrastack-wordmark.png';

    [base, embed].forEach((source) => {
        assert.match(source, new RegExp(currentIcon.replaceAll('.', '\\.')));
    });
    [header, footer].forEach((source) => {
        assert.match(source, new RegExp(currentWordmark.replaceAll('.', '\\.')));
        assert.match(source, /aria-label="InfraStack home"/);
        assert.match(source, /infrastack-wordmark-light/);
        assert.match(source, /infrastack-wordmark-dark/);
        assert.match(source, /infrastack-wordmark-text">InfraStack</);
    });
    [base, header, footer, embed].forEach((source) => {
        assert.doesNotMatch(source, /brand-mark\.svg|brand-logo\.svg|infrastack-logo\.svg|favicon\.svg/);
    });
    assert.ok(fs.existsSync(path.join(root, 'public/images/logo/infrastack-icon.png')));
    assert.ok(fs.existsSync(path.join(root, 'public/images/logo/infrastack-wordmark.png')));
    assert.match(mainCss, /html\[data-theme="dark"\][^{]+\.infrastack-wordmark-light/);
    assert.match(mainCss, /html\[data-theme="dark"\][^{]+\.infrastack-wordmark-dark/);
    assert.match(mainCss, /\.infrastack-wordmark-text/);
    assert.match(mainCss, /\.infrastack-wordmark-suffix/);
});

test('Studio editor loads publish dialog styles from Studio ownership', () => {
    const studio = read('templates/studio/index.html.twig');
    const studioCss = read('assets/styles/studio/studio.css');

    assert.match(studio, /styles\/studio\/studio\.css/);
    assert.match(studioCss, /\/\* \[studio-publish\] Section: Start \*\//);
    assert.match(studioCss, /\.studio-publish-dialog/);
});

test('shared snapshot endpoints and bounded filesystem storage are declared', () => {
    const controller = read('src/Controller/Layout/ShareController.php');
    const service = read('src/Service/Layout/ShareService.php');
    const cleanupCommand = read('src/Command/StudioShareCleanupCommand.php');
    const services = read('config/services.yaml');
    assert.match(controller, /\/api\/studio\/share/);
    assert.match(controller, /\/share\/\{shareId\}/);
    assert.match(controller, /\/embed\/\{shareId\}/);
    assert.match(service, /MAX_PROJECT_BYTES = 1_048_576/);
    assert.match(service, /var\/studio\/shares/);
    assert.match(service, /LOCK_EX/);
    assert.match(service, /'expires_at' =>/);
    assert.match(service, /public function cleanupExpired\(bool \$delete = false/);
    assert.match(service, /if \(!array_key_exists\('expires_at', \$snapshot\)\)/);
    assert.match(cleanupCommand, /app:studio:shares:cleanup/);
    assert.match(cleanupCommand, /addOption\('dry-run'/);
    assert.match(cleanupCommand, /addOption\('delete'/);
    assert.match(services, /env\(APP_STUDIO_SHARE_DIR\): 'var\/studio\/shares'/);
    assert.match(services, /env\(APP_STUDIO_SHARE_TTL_DAYS\): '90'/);
});
