// ==========================================
// Google Apps Script — 囲碁大会 申込受付 + ニュース管理
// スプレッドシートの「拡張機能 → Apps Script」に貼り付けて使用
// ==========================================

const SHEET_NAME = 'Inscrições';
const NEWS_SHEET_NAME = 'News';
const DRIVE_FOLDER_NAME = 'IgoChallenge-News';

// ニュース写真用のDriveフォルダを取得/作成
function getNewsFolder() {
  const folders = DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(DRIVE_FOLDER_NAME);
}

// base64画像をDriveにアップロードして公開URLを返す
function uploadPhoto(base64Data, filename) {
  try {
    const matches = base64Data.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) return '';
    const contentType = matches[1];
    const base64 = matches[2];
    const blob = Utilities.newBlob(Utilities.base64Decode(base64), contentType, filename);
    const file = getNewsFolder().createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return `https://drive.google.com/uc?export=view&id=${file.getId()}`;
  } catch (err) {
    console.error('Photo upload error:', err.message);
    return '';
  }
}

// ニュースシートの初期化（なければ作成）
function ensureNewsSheet(ss) {
  let sheet = ss.getSheetByName(NEWS_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(NEWS_SHEET_NAME);
    sheet.appendRow(['ID', 'Title', 'Content', 'Photo1', 'Photo2', 'Photo3', 'PublishedAt']);
    const header = sheet.getRange(1, 1, 1, 7);
    header.setFontWeight('bold');
    header.setBackground('#2d5016');
    header.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.action === 'news')        return handleNewsPost(data);
    if (data.action === 'delete-news') return handleNewsDelete(data.id);

    return handleRegister(data);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ---- ニュース投稿 ----
function handleNewsPost(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ensureNewsSheet(ss);
  const id = Date.now().toString();

  const photos = (data.photos || []).slice(0, 3);
  const photoUrls = photos.map((p, i) =>
    p.startsWith('data:')
      ? uploadPhoto(p, `news-${id}-${i + 1}.jpg`)
      : p  // すでにURLの場合はそのまま
  );

  sheet.appendRow([
    id,
    data.title       || '',
    data.content     || '',
    photoUrls[0]     || '',
    photoUrls[1]     || '',
    photoUrls[2]     || '',
    data.publishedAt || new Date().toISOString(),
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true, id }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---- ニュース削除 ----
function handleNewsDelete(id) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ensureNewsSheet(ss);
  const lastRow = sheet.getLastRow();

  if (lastRow > 1) {
    const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < ids.length; i++) {
      if (String(ids[i][0]) === String(id)) {
        sheet.deleteRow(i + 2);
        break;
      }
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---- 参加申込（既存） ----
function handleRegister(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Data/Hora (登録日時)',
      'Nome (名前)',
      'E-mail',
      'Escola (学校)',
      'Nível (レベル)',
      'Idioma (言語)',
    ]);
    const header = sheet.getRange(1, 1, 1, 6);
    header.setFontWeight('bold');
    header.setBackground('#2d5016');
    header.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  const levelLabels = {
    beginner:     'Iniciante / 初心者',
    novice:       'Novato / 入門者',
    intermediate: 'Intermediário / 初級者',
  };

  sheet.appendRow([
    new Date(),
    data.name   || '',
    data.email  || '',
    data.school || '',
    levelLabels[data.level] || data.level || '',
    data.language === 'ja' ? '日本語' : 'Português',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---- GET: ニュース一覧取得 / 接続テスト ----
function doGet(e) {
  if (e && e.parameter && e.parameter.action === 'news') {
    try {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ensureNewsSheet(ss);
      const lastRow = sheet.getLastRow();

      if (lastRow <= 1) {
        return ContentService
          .createTextOutput(JSON.stringify({ success: true, posts: [] }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      const rows = sheet.getRange(2, 1, lastRow - 1, 7).getValues();
      const posts = rows
        .filter(row => row[0])
        .map(row => ({
          id:          String(row[0]),
          title:       String(row[1]),
          content:     String(row[2]),
          photos:      [row[3], row[4], row[5]].filter(Boolean),
          publishedAt: String(row[6]),
        }))
        .reverse();

      return ContentService
        .createTextOutput(JSON.stringify({ success: true, posts }))
        .setMimeType(ContentService.MimeType.JSON);

    } catch (err) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: err.message, posts: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Igo Challenge webhook is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
