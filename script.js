// 导航平滑滚动与激活状态
document.addEventListener('DOMContentLoaded', function(){
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', function(e){
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 在滚动时高亮当前章节链接
  const sections = document.querySelectorAll('main section');
  window.addEventListener('scroll', function(){
    let fromTop = window.scrollY + 100;
    sections.forEach(section => {
      const id = section.id;
      const navLink = document.querySelector(`.main-nav a[href="#${id}"]`);
      if(section.offsetTop <= fromTop && (section.offsetTop + section.offsetHeight) > fromTop){
        if(navLink) navLink.classList.add('active');
      } else {
        if(navLink) navLink.classList.remove('active');
      }
    });
  });

  // 技能动画：当 skills 进入视口时，填充进度条
  const skillSection = document.querySelector('#skills');
  let skillsAnimated = false;
  function animateSkills(){
    if(skillsAnimated) return;
    const rect = skillSection.getBoundingClientRect();
    if(rect.top < window.innerHeight && rect.bottom >= 0){
      const skills = document.querySelectorAll('.skill');
      skills.forEach(s => {
        const rating = parseInt(s.getAttribute('data-rating'),10);
        const fill = s.querySelector('.skill-fill');
        // 将满星(5)映射到 100%
        const pct = Math.round((rating/5) * 100);
        fill.style.width = pct + '%';
        // 也可以高亮星星（简单处理）
        const starsNode = s.querySelector('.stars');
        const starsText = '★★★★★'.slice(0, rating) + '☆☆☆☆☆'.slice(0, 5-rating);
        starsNode.textContent = starsText
          .replace(/★/g, '★ ') // 在视觉上加空格
          .replace(/☆/g, ' ☆');
      });
      skillsAnimated = true;
    }
  }
  window.addEventListener('scroll', animateSkills);
  // 立即尝试一次（若页面初始即在该位置）
  animateSkills();

  // 表单验证
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    formMsg.textContent = '';
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    if(!name.value.trim()){ formMsg.textContent = '请填写姓名。'; name.focus(); return; }
    if(!email.value.trim()){ formMsg.textContent = '请填写邮箱。'; email.focus(); return; }
    // 简单邮箱格式校验
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email.value)){ formMsg.textContent = '请输入有效的邮箱地址。'; email.focus(); return; }
    if(!message.value.trim()){ formMsg.textContent = '请填写留言内容。'; message.focus(); return; }

    // 成功（这里模拟提交）
    formMsg.style.color = 'green';
    formMsg.textContent = '消息已发送，感谢！';
    form.reset();
    setTimeout(()=>{ formMsg.textContent=''; formMsg.style.color=''; }, 3000);
  });
});