// ハイライトしたい固定キーワード
const targetWord = "無料";

function highlightText(node) {
  // テキストノード（文字データが入っている部分）のみ処理対象にする
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.nodeValue;
    if (text.includes(targetWord)) {
      const span = document.createElement("span");
      // 対象ワードを <mark> タグで置換
      const re = new RegExp(`(${targetWord})`, "g");
      span.innerHTML = text.replace(re, "<mark class='my-highlight'>$1</mark>");
      node.parentNode.replaceChild(span, node);
    }
  } else {
    // 子要素がある場合は再帰的に探索（scriptタグやstyleタグは除外）
    if (node.nodeName !== "SCRIPT" && node.nodeName !== "STYLE") {
      for (let child of Array.from(node.childNodes)) {
        highlightText(child);
      }
    }
  }
}

// ページ読み込み完了時に実行
highlightText(document.body);