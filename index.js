$(document).ready(function () {
  //點擊之後 輸出到右邊
  $('.articleOutput').on('click keypress change', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
    let data = $('.articleOrg').val();
    data = sort(data);
    data = sortImg(data);
    $('.articleFine').html(data);
  });

  //點擊 消失
  $('.displaynone').on('click', function () {
    $('.in').hide();
  });
  //一件產生tag
  $('.tagOutput').on('click change', function () {
    let b = $('.Url').val();
    console.log(b);
    b = urlToTag(b);
    console.log(b);
    $('.tagFine').text(b);
    $('.Url').val('');
  });
  //一件複製文章 標籤
  $('.copy-article').on('click', function () {
    copyToClipBoard('.articleFine');
    $('.articleFine').val('');
  });
  $('.copy').on('click', function () {
    copyToClipBoard('.tagFine');
    $('.tagFine').val('');
  });

  {
    //形成按鈕
    let cates = getLocalStorage();
    console.log(cates);

    renderCate(cates);

    //添加tage
    $('.cateAdd').on('click', function () {
      if (!$('.cateAddIn').val()) {
        alert('不可空白');
      } else {
        let cate = $('.cateAddIn').val();
        cates.push(cate);
        console.log(cates);

        $('.cateAddIn').val('');
        setLocalStorage(cates);
        renderCate(cates);
      }
    });
    console.log(cates);
  }
  $('textarea').change(function (e) {
    e.preventDefault();
    $(this).val();
  });
});

//遇到*** 要刪除
function sort(data) {
  data = data.replace('***', '');
  // console.log(data);
  return data;
}

//點擊copy 就複製全部
function copyToClipBoard(className) {
  var content = document.querySelector(className);
  content.select();
  document.execCommand('copy');
}

//圖片產生tag
function urlToTag(url) {
  let a = `![pic](${url})`;
  return a;
}

//遇到圖片 要加入span?\
//不能用
function sortImg(article) {
  article = article.replace(/Untitled/g, '--圖片要修改--');
  // console.log(article);
  return article;
}
//渲染出標籤
function renderCate(cates) {
  let a = '';
  for (let i = 0; i < cates.length; i++) {
    a += `<div>${cates[i]}
            <button class='delete' onclick="deleteFromArr('${cates[i]}');">X</button>
            </div>`;
  }
  $('.cates').html(a);
}
//將arr輸入local storage
function setLocalStorage(arr) {
  let b = '';
  b = arr.join();
  localStorage.setItem('cates', b);
  return b;
}
//將local storage取出
function getLocalStorage(arr) {
  let a = localStorage.getItem('cates');
  if (!a) {
    return [];
  } else {
    b = a.split(',');
    console.log(b);
    console.log(typeof b);
    return b;
  }
}

function deleteFromArr(data) {
  let arr = getLocalStorage();
  console.log(arr);
  let arr2 = [];
  for (i = 0; i < arr.length; i++) {
    if (data == arr[i]) {
      console.log(data);
    } else {
      arr2.push(arr[i]);
      console.log(arr2);
    }
  }
  setLocalStorage(arr2);
  renderCate(arr2);
  return arr2;
}
