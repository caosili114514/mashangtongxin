/* ==========================================================================
   马上同心 · 2026-10-22 修订交互
   - 自东向西的红色飘带路线图（两处复用）
   - 点击站点打开详细说明
   - 石榴信箱明信片寄语（本机保存）
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     1. 路线数据
     坐标与路线控制点一一对应：经度越大越靠右，北京在东，张家川在西。
     ------------------------------------------------------------------ */
  var STATIONS = [
    {
      id: 'cnu',
      no: '01',
      name: '北京 · 中央民族大学',
      short: '中央民族大学',
      meta: '2026.04—06',
      labelPos: 'up',
      x: 1056,
      y: 179,
      date: '2026年4月—6月 · 行前共创',
      place: '北京市海淀区中关村南大街27号',
      coord: '39.95°N · 116.32°E',
      journey: '北京城区 → 故宫博物院 · 公共交通约 40 分钟',
      sub: '文化信使 · 出发',
      lead: '这里不是地理意义上的第一件文物，却是把学术问题变成教育行动的原点。团队在故宫社教部的指导下完成前期共创，并把「六骏名字为什么不像汉语」带向西安与张家川。',
      actions: [
        '组建九人跨学科团队，完成从文物研究到教育转化的整体方案。',
        '参加「同心共铸·神骏新传」青年文化共创计划系列培训，研读《昭陵六骏图》卷与「神骏」特展。',
        '把研究成果转化为微课脚本、互动游戏、拼图教具、宣讲方案与影像拍摄计划。',
        '以「文化信使」身份明确实践目标：从故宫出发，把文物故事讲给边疆孩子听。'
      ],
      quote: '从校园出发的那一刻，我们带走的不是结论，而是一个值得和孩子一起追问的问题。'
    },
    {
      id: 'gugong',
      no: '02',
      name: '北京 · 故宫博物院',
      short: '故宫博物院',
      meta: '2026.04—06',
      labelPos: 'down',
      x: 840,
      y: 220,
      date: '2026年4月22日—6月21日',
      place: '北京市东城区景山前街4号',
      coord: '39.92°N · 116.40°E',
      journey: '故宫 → 北京西站 → 西安北站 · 高铁约 4.5 小时',
      sub: '故宫学术共创 · 溯源',
      lead: '在「神骏：故宫书画艺术中的马世界」特展中，团队第一次把六骏放回中国马文化与人文学术的长卷里，也从馆藏文物的物证出发，学习讲述各民族交往交流交融的历史。',
      actions: [
        '参观「神骏」特展，重点研读金代赵霖《昭陵六骏图》卷等马主题书画。',
        '参加《百态神骏伴苍生》《大唐马政与丝路贡马史话》等专题讲座，建立文物研究与教育转化的方法框架。',
        '参与 5 月 19 日「同心共铸·神骏新传」青年文化共创计划阶段展示与「文化信使」启动仪式。',
        '从「文物是什么」继续追问「怎样把文物讲给孩子听」，形成面向青少年的课程与游戏雏形。'
      ],
      quote: '六匹马的名字保留着突厥语、波斯语等多元语音。一个中原皇帝用多语为战马命名，本身就是民族交往交流交融的生动注脚。'
    },
    {
      id: 'xian',
      no: '03',
      name: '西安 · 碑林博物馆',
      short: '西安碑林博物馆',
      meta: '2026.07.28',
      labelPos: 'up',
      x: 504,
      y: 136,
      date: '2026年7月28日',
      place: '陕西省西安市碑林区三学街15号',
      coord: '34.26°N · 108.94°E',
      journey: '西安北站 → 天水南站 → 张家川 · 高铁约 1.5 小时 + 公路约 1 小时',
      sub: '从绘画到石刻 · 实物对照',
      lead: '在「骧腾百世——昭陵六骏专题展」展厅，团队与六骏石刻真迹面对面。绘画中的设色与石刻上的箭痕形成了跨越媒介的对话，也让「三交史」的讲述有了更坚实的实物证据。',
      actions: [
        '观察四件唐代青石原石与两件复制品，记录六骏的姿态、毛色与雕刻细节。',
        '重点查看青骓、什伐赤身中五箭，拳毛騧身中九箭等箭伤痕迹。',
        '体验馆内昭陵六骏拼图互动展项，对照团队自制教具的设计思路。',
        '完成从故宫绘画到西安石刻的媒介对照，为微课与宣讲补充一手素材。'
      ],
      quote: '图卷上的一笔颜色与青石上的一道箭痕互相印证：历史并不抽象，它就藏在文物可触摸的细节里。'
    },
    {
      id: 'zhangjiachuan',
      no: '04',
      name: '甘肃 · 张家川回族自治县',
      short: '甘肃张家川',
      meta: '2026.07.29—31',
      labelPos: 'down',
      x: 180,
      y: 206,
      date: '2026年7月29日—31日',
      place: '甘肃省天水市张家川回族自治县',
      coord: '34.99°N · 106.21°E',
      journey: '抵达文化信使的「家乡站」· 北京至张家川跨越约 1300 公里',
      sub: '广场 · 博物馆 · 实践育人中心',
      lead: '张家川是马家塬战国墓地所在地，也是此次文化信使的目的地。团队在行政中心广场、县博物馆与县实践育人中心开展调研、宣讲和互动，把六骏故事真正讲到青少年身边。',
      actions: [
        '在县行政中心广场开展宣讲、拼图与游戏互动，与当地青少年和群众面对面交流。',
        '在马家塬车舆博物馆访谈讲解员，观摩融合中原、草原与西域工艺的战国车马遗存。',
        '在县实践育人中心开展集中宣讲，覆盖 500 余人次，收集书信与绘画作品 56 份。',
        '完成纪录片素材采集、微课镜头拍摄和活动反馈收集，为后续成果转化留下第一手资料。'
      ],
      quote: '当孩子指着拼图说出「特勒骠」的名字，从故宫到张家川的千里路线，便在课堂里完成了最后一次抵达。'
    }
  ];

  /* ------------------------------------------------------------------
     2. 用 Catmull-Rom 曲线把控制点连成连续飘带
     ------------------------------------------------------------------ */
  var GUIDE_POINTS = [
    [1188, 186],
    [1138, 169],
    [1102, 152],
    [1048, 166],
    [1004, 197],
    [952, 214],
    [890, 229],
    [826, 224],
    [760, 198],
    [702, 175],
    [648, 177],
    [598, 198],
    [552, 178],
    [510, 142],
    [485, 112],
    [445, 117],
    [408, 151],
    [370, 188],
    [328, 209],
    [282, 215],
    [224, 203],
    [185, 185],
    [151, 174],
    [105, 180],
    [69, 190],
    [30, 175]
  ];

  function smoothPath(points) {
    if (!points || points.length < 2) return '';
    var d = 'M ' + points[0][0] + ' ' + points[0][1];
    for (var i = 0; i < points.length - 1; i++) {
      var p0 = i === 0 ? points[0] : points[i - 1];
      var p1 = points[i];
      var p2 = points[i + 1];
      var p3 = i + 2 < points.length ? points[i + 2] : p2;
      var cp1x = p1[0] + (p2[0] - p0[0]) / 6;
      var cp1y = p1[1] + (p2[1] - p0[1]) / 6;
      var cp2x = p2[0] - (p3[0] - p1[0]) / 6;
      var cp2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += ' C ' + cp1x.toFixed(2) + ' ' + cp1y.toFixed(2) + ', ' +
           cp2x.toFixed(2) + ' ' + cp2y.toFixed(2) + ', ' +
           p2[0] + ' ' + p2[1];
    }
    return d;
  }

  var RIBBON_SAMPLE_STEPS = 13;

  function sampleCatmullRom(points) {
    var out = [];
    for (var i = 0; i < points.length - 1; i++) {
      var p0 = i === 0 ? points[0] : points[i - 1];
      var p1 = points[i];
      var p2 = points[i + 1];
      var p3 = i + 2 < points.length ? points[i + 2] : p2;
      for (var j = 0; j < RIBBON_SAMPLE_STEPS; j++) {
        var t = j / RIBBON_SAMPLE_STEPS;
        var t2 = t * t;
        var t3 = t2 * t;
        var x = 0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t +
                (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
                (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);
        var y = 0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t +
                (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
                (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);
        out.push([x, y]);
      }
    }
    out.push(points[points.length - 1]);
    return out;
  }

  function pointsToPath(points, close) {
    if (!points.length) return '';
    var d = 'M ' + points[0][0].toFixed(2) + ' ' + points[0][1].toFixed(2);
    for (var i = 1; i < points.length; i++) {
      d += ' L ' + points[i][0].toFixed(2) + ' ' + points[i][1].toFixed(2);
    }
    return d + (close ? ' Z' : '');
  }

  function buildRibbon(points) {
    var curve = sampleCatmullRom(points);
    var n = curve.length;
    var samples = curve.map(function (p, i) {
      var u = i / (n - 1);
      var taper = Math.sin(Math.PI * u);
      var width = 7 + 98 * Math.pow(Math.max(0, taper), 0.62);
      width *= 1 + 0.075 * Math.sin(u * Math.PI * 5.2 + 0.55);
      width = Math.max(6, width);
      var prev = curve[Math.max(0, i - 1)];
      var next = curve[Math.min(n - 1, i + 1)];
      var dx = next[0] - prev[0];
      var dy = next[1] - prev[1];
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      return {
        x: p[0], y: p[1], w: width, u: u,
        nx: -dy / len, ny: dx / len,
        tx: dx / len, ty: dy / len
      };
    });

    function offset(s, d) {
      return [s.x + s.nx * d, s.y + s.ny * d];
    }
    function offsetPath(fn) {
      return pointsToPath(samples.map(fn), false);
    }

    var top = samples.map(function (s) { return offset(s, -s.w / 2); });
    var bottom = samples.map(function (s) { return offset(s, s.w / 2); });
    var topPath = pointsToPath(top, false);
    var bottomPath = pointsToPath(bottom, false);
    var reversedBottom = bottom.slice().reverse();
    var shape = topPath + ' L ' +
      reversedBottom.map(function (p) { return p[0].toFixed(2) + ' ' + p[1].toFixed(2); }).join(' L ') + ' Z';
    var centerPath = pointsToPath(samples.map(function (s) { return [s.x, s.y]; }), false);
    var sheenPath = offsetPath(function (s) { return offset(s, -s.w * 0.19); });
    var shadePath = offsetPath(function (s) { return offset(s, s.w * 0.27); });

    var folds = '';
    var foldUs = [0.105, 0.255, 0.415, 0.575, 0.735, 0.885];
    foldUs.forEach(function (u, k) {
      var idx = Math.max(2, Math.min(n - 4, Math.round(u * (n - 1))));
      var a = samples[idx];
      var b = samples[Math.min(n - 2, idx + 4)];
      var side = k % 2 === 0 ? 1 : -1;
      var p1 = offset(a, side * a.w * 0.46);
      var p2 = offset(b, -side * b.w * 0.46);
      var mx = (a.x + b.x) / 2 + a.tx * 7;
      var my = (a.y + b.y) / 2 + a.ty * 7;
      folds += '<path d="M ' + p1[0].toFixed(2) + ' ' + p1[1].toFixed(2) +
        ' Q ' + mx.toFixed(2) + ' ' + my.toFixed(2) + ' ' +
        p2[0].toFixed(2) + ' ' + p2[1].toFixed(2) +
        '" fill="none" stroke="rgba(255,229,195,.19)" stroke-width="7" stroke-linecap="round"></path>';
      folds += '<path d="M ' + p1[0].toFixed(2) + ' ' + p1[1].toFixed(2) +
        ' Q ' + mx.toFixed(2) + ' ' + my.toFixed(2) + ' ' +
        p2[0].toFixed(2) + ' ' + p2[1].toFixed(2) +
        '" fill="none" stroke="rgba(80,8,15,.16)" stroke-width="1.6" transform="translate(2 5)"></path>';
    });

    var startBadge = samples[Math.round((n - 1) * 0.025)];
    var endBadge = samples[Math.round((n - 1) * 0.975)];

    return {
      shape: shape,
      topPath: topPath,
      bottomPath: bottomPath,
      centerPath: centerPath,
      sheenPath: sheenPath,
      shadePath: shadePath,
      folds: folds,
      startBadge: startBadge,
      endBadge: endBadge
    };
  }

  var RIBBON = buildRibbon(GUIDE_POINTS);
  var ROUTE_PATH = RIBBON.centerPath;

  function stationButton(st, index) {
    var xPct = (st.x / 1200 * 100).toFixed(2);
    var yPct = (st.y / 360 * 100).toFixed(2);
    var labelClass = st.labelPos === 'down' ? 'is-down' : 'is-up';
    if (index === 0) labelClass += ' is-edge-right';
    if (index === STATIONS.length - 1) labelClass += ' is-edge-left';
    return '' +
      '<button class="route-stop ' + labelClass + '" type="button" data-route-id="' + st.id + '" ' +
      'style="--x:' + xPct + '%;--y:' + yPct + '%" ' +
      'aria-label="' + st.name + '，点击查看站点详情" aria-haspopup="dialog">' +
        '<span class="route-stop__dot"><span class="route-stop__num">' + st.no + '</span></span>' +
        '<span class="route-stop__label"><b>' + st.name + '</b><em>' + st.meta + ' · 点击查看详情</em></span>' +
      '</button>';
  }

  function mobileStationButton(st) {
    return '' +
      '<button class="route-mobile-stop" type="button" data-route-id="' + st.id + '" aria-haspopup="dialog">' +
        '<span>' + st.no + '</span>' +
        '<div><b>' + st.name + '</b><small>' + st.date + '</small></div>' +
        '<em>查看详情 →</em>' +
      '</button>';
  }

  function routeSvg() {
    return '<div class="route-painting" aria-hidden="true">' +
      '<img src="assets/img/route-ribbon-watercolor.webp" alt="" loading="eager" decoding="async">' +
    '</div>';
  }

  function renderRouteMap(root, index) {
    var uid = 'routeRibbon' + index;
    root.innerHTML = '' +
      '<div class="ribbon-map__top">' +
        '<div class="ribbon-map__caption"><span class="map-kicker">自东向西</span><strong>北京 → 西安 → 甘肃张家川</strong></div>' +
        '<span class="map-key"><i aria-hidden="true"></i>点击站点，查看详情</span>' +
      '</div>' +
      '<div class="map-axis" aria-hidden="true"><span>西 · 106°E</span><span>一条丝带，千里同心</span><span>东 · 116°E</span></div>' +
      '<div class="ribbon-map__canvas">' +
        routeSvg(uid) +
        STATIONS.map(stationButton).join('') +
      '</div>' +
      '<div class="ribbon-map__mobile" aria-label="实践路线站点列表">' +
        '<div class="route-mobile-note"><span>自东向西</span>北京 → 西安 → 甘肃张家川</div>' +
        STATIONS.map(mobileStationButton).join('') +
      '</div>' +
      '<div class="ribbon-map__foot">' +
        '<span>地理方位示意 · 非等比例</span>' +
        '<span>北京 → 西安 → 甘肃张家川 · 约 1300 km</span>' +
      '</div>';
  }

  /* ------------------------------------------------------------------
     3. 两处路线图渲染
     ------------------------------------------------------------------ */
  var routeRoots = document.querySelectorAll('[data-route-map]');
  Array.prototype.forEach.call(routeRoots, function (root, index) {
    renderRouteMap(root, index + 1);
  });

  /* ------------------------------------------------------------------
     4. 站点详情：原生 dialog + 键盘可访问
     ------------------------------------------------------------------ */
  var routeDialog = document.getElementById('routeDialog');
  var lastRouteTrigger = null;

  function findStation(id) {
    for (var i = 0; i < STATIONS.length; i++) {
      if (STATIONS[i].id === id) return STATIONS[i];
    }
    return null;
  }

  function fillRouteDialog(st) {
    if (!routeDialog || !st) return;
    document.getElementById('routeDialogIndex').textContent =
      st.no + ' / ' + String(STATIONS.length).padStart(2, '0');
    document.getElementById('routeDialogTitle').textContent = st.name;
    document.getElementById('routeDialogSub').textContent = st.sub + ' · ' + st.date;
    document.getElementById('routeDialogLead').textContent = st.lead;

    var facts = [
      ['时间', st.date],
      ['地点', st.place],
      ['地理坐标', st.coord],
      ['下一程', st.journey]
    ];
    document.getElementById('routeDialogFacts').innerHTML = facts.map(function (f) {
      return '<div class="route-dialog__fact"><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>';
    }).join('');

    document.getElementById('routeDialogActions').innerHTML =
      '<p class="route-dialog__actions-title">这一站，我们做了什么</p>' +
      '<ul class="route-dialog__actions">' +
        st.actions.map(function (a) { return '<li>' + a + '</li>'; }).join('') +
      '</ul>';
    document.getElementById('routeDialogQuote').textContent = st.quote;
  }

  function openRouteDialog(st, trigger) {
    if (!routeDialog || !st) return;
    lastRouteTrigger = trigger || null;
    fillRouteDialog(st);
    document.body.classList.add('route-dialog-open');
    if (typeof routeDialog.showModal === 'function') {
      if (!routeDialog.open) routeDialog.showModal();
    } else {
      routeDialog.setAttribute('open', '');
    }
  }

  function closeRouteDialog() {
    if (!routeDialog) return;
    document.body.classList.remove('route-dialog-open');
    if (typeof routeDialog.close === 'function' && routeDialog.open) routeDialog.close();
    else routeDialog.removeAttribute('open');
    if (lastRouteTrigger && lastRouteTrigger.focus) {
      lastRouteTrigger.focus({ preventScroll: true });
    }
    lastRouteTrigger = null;
  }

  document.addEventListener('click', function (e) {
    var trigger = e.target.closest && e.target.closest('[data-route-id]');
    if (!trigger) return;
    var st = findStation(trigger.getAttribute('data-route-id'));
    if (st) openRouteDialog(st, trigger);
  });

  if (routeDialog) {
    Array.prototype.forEach.call(routeDialog.querySelectorAll('[data-route-close]'), function (btn) {
      btn.addEventListener('click', closeRouteDialog);
    });
    routeDialog.addEventListener('click', function (e) {
      if (e.target === routeDialog) closeRouteDialog();
    });
    routeDialog.addEventListener('cancel', function () {
      document.body.classList.remove('route-dialog-open');
    });
    routeDialog.addEventListener('close', function () {
      document.body.classList.remove('route-dialog-open');
    });
  }

  /* ------------------------------------------------------------------
     5. 石榴信箱：现场回答卡 + 本机寄语明信片
     ------------------------------------------------------------------ */
  var mailboxForm = document.querySelector('[data-mailbox-form]');
  if (mailboxForm) {
    var mailboxCards = document.querySelector('[data-mailbox-cards]');
    var mailboxInput = mailboxForm.querySelector('textarea');
    var mailboxNameInput = mailboxForm.querySelector('input[name="name"]');
    var mailboxCounter = mailboxForm.querySelector('[data-mailbox-count]');
    var mailboxNote = mailboxForm.querySelector('[data-mailbox-note]');
    var mailboxKey = 'mstx-mailbox-postcards-v1';
    var saved = [];

    function makeId() {
      return 'p-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
    }

    try {
      saved = JSON.parse(localStorage.getItem(mailboxKey) || '[]');
      if (!Array.isArray(saved)) saved = [];
    } catch (e) {
      saved = [];
    }

    // 兼容旧版本只保存 text/date 的留言，自动补上姓名与可删除的稳定 id
    saved = saved.filter(function (entry) {
      return entry && entry.text;
    }).map(function (entry, i) {
      return {
        id: entry.id || ('legacy-' + i + '-' + makeId()),
        text: String(entry.text).slice(0, 88),
        name: String(entry.name || '匿名').slice(0, 20),
        date: entry.date || '未记录日期'
      };
    }).slice(0, 8);

    function saveMailbox() {
      try { localStorage.setItem(mailboxKey, JSON.stringify(saved)); } catch (e) {}
    }

    function paintCounter() {
      if (!mailboxInput || !mailboxCounter) return;
      mailboxCounter.textContent = mailboxInput.value.length + ' / ' + mailboxInput.maxLength;
    }

    function makeUserCard(entry) {
      var fig = document.createElement('figure');
      fig.className = 'mail-postcard mail-postcard--user';
      fig.setAttribute('data-mailbox-id', entry.id);

      var head = document.createElement('div');
      head.className = 'mail-postcard__head';
      var label = document.createElement('span');
      label.textContent = '石榴信箱 · 来自 ' + entry.name;

      var meta = document.createElement('div');
      meta.className = 'mail-postcard__meta';
      var stamp = document.createElement('span');
      stamp.className = 'mail-postcard__stamp';
      stamp.textContent = '本机';
      var del = document.createElement('button');
      del.type = 'button';
      del.className = 'mail-postcard__delete';
      del.setAttribute('data-mailbox-delete', '');
      del.setAttribute('aria-label', '删除这张明信片及本机记录');
      del.title = '删除这张明信片';
      del.textContent = '删除';
      meta.appendChild(stamp);
      meta.appendChild(del);
      head.appendChild(label);
      head.appendChild(meta);

      var quote = document.createElement('blockquote');
      quote.textContent = '「' + entry.text + '」';

      var cap = document.createElement('figcaption');
      cap.textContent = '—— ' + entry.date + ' · 保存在本机的明信片';

      var line = document.createElement('div');
      line.className = 'mail-postcard__line';

      fig.appendChild(head);
      fig.appendChild(quote);
      fig.appendChild(cap);
      fig.appendChild(line);
      return fig;
    }

    function renderSaved() {
      if (!mailboxCards) return;
      // saved 是最新在前；从旧到新依次插到最前，最终保持最新在前
      saved.slice().reverse().forEach(function (entry) {
        mailboxCards.insertBefore(makeUserCard(entry), mailboxCards.firstElementChild);
      });
    }

    if (mailboxInput) {
      paintCounter();
      mailboxInput.addEventListener('input', paintCounter);
    }
    renderSaved();
    saveMailbox();

    if (mailboxCards) {
      mailboxCards.addEventListener('click', function (e) {
        var del = e.target.closest && e.target.closest('[data-mailbox-delete]');
        if (!del) return;
        var card = del.closest('.mail-postcard--user');
        if (!card) return;
        var id = card.getAttribute('data-mailbox-id');
        saved = saved.filter(function (entry) { return entry.id !== id; });
        saveMailbox();
        card.remove();
        if (mailboxNote) mailboxNote.textContent = '明信片已删除，本机保存的记录也已同步移除。';
      });
    }

    mailboxForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var text = (mailboxInput && mailboxInput.value || '').trim();
      if (!text) {
        if (mailboxNote) mailboxNote.textContent = '先写下一句话，再投入信箱吧。';
        if (mailboxInput) mailboxInput.focus();
        return;
      }
      var name = (mailboxNameInput && mailboxNameInput.value || '').trim() || '匿名';
      var entry = {
        id: makeId(),
        text: text.slice(0, 88),
        name: name.slice(0, 20),
        date: new Date().toLocaleDateString('zh-CN')
      };
      saved.unshift(entry);
      saved = saved.slice(0, 8);
      saveMailbox();
      if (mailboxCards) {
        mailboxCards.insertBefore(makeUserCard(entry), mailboxCards.firstElementChild);
        var userCards = mailboxCards.querySelectorAll('.mail-postcard--user');
        for (var i = 8; i < userCards.length; i++) {
          if (userCards[i].parentNode) userCards[i].parentNode.removeChild(userCards[i]);
        }
      }
      mailboxInput.value = '';
      paintCounter();
      if (mailboxNote) mailboxNote.textContent = '已投入「石榴信箱」。卡片会保存在本机，可随时点击「删除」移除。';
    });
  }

  /* ------------------------------------------------------------------
     6. 给结果目录的站内跳转留出吸顶导航高度
     ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#result-"], a[href="#practice-results"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var id = a.getAttribute('href');
      if (id && id.length > 1) {
        var target = document.getElementById(id.slice(1));
        if (target) target.style.scrollMarginTop = 'calc(var(--nav-h) + 24px)';
      }
    });
  });

})();
