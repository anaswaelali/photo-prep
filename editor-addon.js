// Adds a "crop / flatten / remove" button on top of the existing tool. app.js is untouched.
(function(){
  var btn=document.createElement('button');
  btn.textContent='✂ قص وتعديل صورة قبل ما تضيفها';
  btn.setAttribute('style','display:block;width:calc(100% - 32px);max-width:560px;margin:12px auto 0;padding:14px;border-radius:16px;border:1.5px solid #2f7d6d;background:#fff;color:#2f7d6d;font:600 16px system-ui,sans-serif;cursor:pointer');
  var wrap=null;
  function close(){if(wrap){wrap.remove();wrap=null}}
  btn.onclick=function(){
    close();
    wrap=document.createElement('div');
    wrap.setAttribute('style','position:fixed;inset:0;z-index:100;background:#fdfbf9');
    var f=document.createElement('iframe');f.src='edit.html';f.setAttribute('style','border:0;width:100%;height:100%');
    wrap.appendChild(f);document.body.appendChild(wrap);
  };
  window.addEventListener('message',function(e){
    if(e.origin!==location.origin||!e.data)return;
    if(e.data.type==='photoprep-edit-cancel'){close();return}
    if(e.data.type==='photoprep-edited'&&e.data.blob instanceof Blob){
      var input=document.querySelector('input[type=file]');
      if(input){
        var file=new File([e.data.blob],e.data.name||'edited.jpg',{type:'image/jpeg'});
        var dt=new DataTransfer();dt.items.add(file);input.files=dt.files;
        input.dispatchEvent(new Event('change',{bubbles:true}));
      }
      close();
    }
  });
  function add(){var r=document.getElementById('root');document.body.insertBefore(btn,r)}
  if(document.body)add();else document.addEventListener('DOMContentLoaded',add);
})();
