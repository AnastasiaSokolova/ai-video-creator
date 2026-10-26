// Copy and project data — lifted from "Ana Sokolova Portfolio v5.dc.html" (the chosen redesign).
// Edit text here (EN + UA). Room 505, Cupcake and AI UGC are added at the end of PROJECTS.

export const EMAIL = 'a.sokolova4work@gmail.com';
export const STR = {
  en: {
    skip: 'Skip to work', langLabel: 'Language', menu: 'Menu', close: 'Close',
    nav: ['Work', 'Services & Pricing', 'About', 'Contact'],
    heroEyebrow: 'AI visual creator & creative director',
    heroTitle1: 'Your product.', heroTitle2: 'A whole new world', heroT2a: 'A whole new ', heroT2b: 'world', workT1: 'Selected', workT2: 'work', servicesT1: 'Services &', servicesT2: 'pricing', contactT1: 'Start a', contactT2: 'project', aboutCap: 'Detail — Raspberry Jewelry', aboutImgAlt: 'Close-up of a raspberry-inspired beaded necklace on a ceramic plate', openA: 'Open project: ',
    heroSub: 'I create AI product photography, commercial videos and complete visual campaigns for beauty, skincare, jewelry and fashion brands — from the idea and art direction to the final edit.',
    ctaWork: 'Explore work', ctaStart: 'Start a project',
    heroPrices: 'Photos from $10 · Videos from $120 · See all prices',
    showreel: 'Showreel', pause: 'Pause', play: 'Play', soundOn: 'Sound on', soundOff: 'Sound off', tapSound: 'Tap for sound', pauseAria: 'Pause showreel', playAria: 'Play showreel',
    workTitle: 'Selected work', workIntro: 'Campaigns, product photography and films — each one conceived, art-directed and edited by me.',
    filterLabel: 'Filter projects', fAll: 'All', fCampaign: 'Campaigns', fPhoto: 'Photography', fVideo: 'Video', fUgc: 'AI UGC',
    showAll: 'Show all work', showLess: 'Show selected work only', prev: 'Previous project', next: 'Next project', open: 'Open project',
    badgeCampaign: 'Campaign', badgePhoto: 'Photography', badgeVideo: 'Film',
    photos: n => n + (n === 1 ? ' photo' : ' photos'), film: 'film',
    counter: (a, b) => 'Project ' + a + ' of ' + b,
    deliverables: 'Deliverables', startSimilar: 'Start a similar project',
    sourcesToggle: 'View original product photos', prevProject: 'Previous', nextProject: 'Next',
    slidePrev: 'Previous slide', slideNext: 'Next slide', slideGo: 'Go to slide',
    servicesTitle: 'Services & pricing', servicesIntro: 'Starting prices in USD. Choose a package to start an enquiry — it will be preselected in the form.',
    from: 'from',
    gPhoto: 'Photography', gPhotoD: 'AI product photography for product pages, ads and social.', gPhotoMin: 'Minimum order: 5 photos',
    gVideo: 'Video', gVideoD: 'Commercial videos and animated films with a clear idea and edit.',
    gCampaign: 'Campaigns', gCampaignD: 'Video and photos created together in one visual world.',
    includesTitle: 'Every project includes',
    inc: [['Creative direction', 'Concept, mood and art direction tailored to your product.'], ['One revision round', 'One round of feedback and changes is included.'], ['Final files for digital use', 'Prepared for web, social and e-commerce.']],
    fine: 'Final quotes depend on the concept, complexity, scope and usage. Additional revisions are quoted separately.',
    processTitle: 'How it works',
    steps: ['Share your product, goal and references.', 'We agree on the concept, style and deliverables.', 'You receive the work, give feedback and get the final files.'],
    aboutTitle: 'About',
    about1: 'I’m Ana Sokolova — an independent AI visual creator and creative director.',
    about2: 'I create product photography, commercial videos, visual campaigns, animation and cinematic stories. I work on every stage myself — the idea, the art direction and the edit — so each project feels consistent from the first concept to the final file.',
    disciplines: ['Product photography', 'Commercial video', 'Campaigns', 'Animation', 'Cinematic stories'],
    contactTitle: 'Start a project', contactIntro: 'Tell me about your product and what you need. I reply to every enquiry personally.',
    emailAlt: 'Prefer email? Write directly:',
    fName: 'Name', fEmail: 'Email', fService: 'Service or package', fServicePh: 'Choose a service (optional)', other: 'Something else / not sure yet',
    fDesc: 'Short project description', fDescPh: 'Your product, what you need and any timing.', fLink: 'Product or reference link', fBudget: 'Budget',
    optional: '(optional)', required: '(required)',
    budgets: [['', 'Prefer not to say'], ['<100', 'Under $100'], ['100-300', '$100–300'], ['300-600', '$300–600'], ['600+', '$600+']],
    eEmail: 'Please enter your email address.', eEmailF: 'This email doesn’t look right — please check it.', eDesc: 'Please describe your project in a few words.', eLink: 'Please enter a full link, starting with https://',
    submit: 'Send enquiry', sending: 'Sending…', privacy: 'Your details are only used to reply to you.',
    successTitle: 'Thank you — your enquiry has been sent.', successBody: e => 'I’ll reply to ' + e + ' as soon as I can.', sendAnother: 'Send another enquiry',
    errorTitle: 'Your enquiry wasn’t sent.', errorNC: 'The form isn’t connected to email delivery yet. Please send your enquiry by email instead — nothing you typed has been lost.', errorGen: 'Something went wrong on the way. Please try again, or send it by email.',
    mailFallback: 'Open in your email app →', toTop: 'Back to top',
    similar: t => 'I’d like something similar to the ' + t + ' project.'
  },
  ua: {
    skip: 'Перейти до робіт', langLabel: 'Мова', menu: 'Меню', close: 'Закрити',
    nav: ['Роботи', 'Послуги й ціни', 'Про мене', 'Контакти'],
    heroEyebrow: 'AI visual creator і креативна директорка',
    heroTitle1: 'Ваш продукт.', heroTitle2: 'Цілий новий світ', heroT2a: 'Цілий новий ', heroT2b: 'світ', workT1: 'Вибрані', workT2: 'роботи', servicesT1: 'Послуги й', servicesT2: 'ціни', contactT1: 'Почати', contactT2: 'проєкт', aboutCap: 'Деталь — Малинові прикраси', aboutImgAlt: 'Крупний план намиста з бісеру, натхненного малиною, на керамічній тарілці', openA: 'Відкрити проєкт: ',
    heroSub: 'Я створюю AI-фотографії продуктів, рекламні відео й цілісні візуальні кампанії для брендів краси, догляду, прикрас і моди — від ідеї та арт-дирекшну до фінального монтажу.',
    ctaWork: 'Дивитися роботи', ctaStart: 'Почати проєкт',
    heroPrices: 'Фото від $10 · Відео від $120 · Усі ціни',
    showreel: 'Шоурил', pause: 'Пауза', play: 'Відтворити', soundOn: 'Увімкнути звук', soundOff: 'Вимкнути звук', tapSound: 'Торкніться для звуку', pauseAria: 'Поставити шоурил на паузу', playAria: 'Відтворити шоурил',
    workTitle: 'Вибрані роботи', workIntro: 'Кампанії, фото продуктів і відео — кожну роботу я задумую, веду як арт-директорка й монтую сама.',
    filterLabel: 'Фільтр проєктів', fAll: 'Усі', fCampaign: 'Кампанії', fPhoto: 'Фото', fVideo: 'Відео', fUgc: 'AI UGC',
    showAll: 'Показати всі роботи', showLess: 'Лише вибрані роботи', prev: 'Попередній проєкт', next: 'Наступний проєкт', open: 'Відкрити проєкт',
    badgeCampaign: 'Кампанія', badgePhoto: 'Фото', badgeVideo: 'Відео',
    photos: n => n + ' фото', film: 'відео',
    counter: (a, b) => 'Проєкт ' + a + ' з ' + b,
    deliverables: 'Що створено', startSimilar: 'Хочу схожий проєкт',
    sourcesToggle: 'Переглянути оригінальні фото продукту', prevProject: 'Попередній', nextProject: 'Наступний',
    slidePrev: 'Попередній слайд', slideNext: 'Наступний слайд', slideGo: 'Перейти до слайда',
    servicesTitle: 'Послуги й ціни', servicesIntro: 'Стартові ціни в доларах США. Оберіть пакет, щоб надіслати запит, — його буде вибрано у формі.',
    from: 'від',
    gPhoto: 'Фото', gPhotoD: 'AI-фотографії продуктів для сторінок товару, реклами й соцмереж.', gPhotoMin: 'Мінімальне замовлення — 5 фото',
    gVideo: 'Відео', gVideoD: 'Рекламні відео та анімаційні фільми з чіткою ідеєю й монтажем.',
    gCampaign: 'Кампанії', gCampaignD: 'Відео й фото, створені разом в одному візуальному світі.',
    includesTitle: 'У кожен проєкт входить',
    inc: [['Креативна концепція', 'Ідея, настрій і арт-дирекшн під ваш продукт.'], ['Один раунд правок', 'Один раунд відгуків і змін уже включено.'], ['Фінальні файли для digital', 'Підготовлені для сайту, соцмереж та e-commerce.']],
    fine: 'Остаточна вартість залежить від концепції, складності, обсягу та умов використання. Додаткові правки оплачуються окремо.',
    processTitle: 'Як це працює',
    steps: ['Ви ділитеся продуктом, метою й референсами.', 'Ми погоджуємо концепцію, стиль і результати.', 'Ви отримуєте роботу, даєте відгук і фінальні файли.'],
    aboutTitle: 'Про мене',
    about1: 'Я Ана Соколова — незалежна AI visual creator і креативна директорка.',
    about2: 'Я створюю фотографії продуктів, рекламні відео, візуальні кампанії, анімацію та кінематографічні історії. Кожен етап — ідею, арт-дирекшн і монтаж — веду сама, тож проєкт залишається цілісним від першої концепції до фінального файлу.',
    disciplines: ['Фото продуктів', 'Рекламне відео', 'Кампанії', 'Анімація', 'Кінематографічні історії'],
    contactTitle: 'Почати проєкт', contactIntro: 'Розкажіть про ваш продукт і що вам потрібно. На кожен запит я відповідаю особисто.',
    emailAlt: 'Зручніше поштою? Пишіть напряму:',
    fName: 'Ім’я', fEmail: 'Email', fService: 'Послуга або пакет', fServicePh: 'Оберіть послугу (необов’язково)', other: 'Інше / ще не знаю',
    fDesc: 'Короткий опис проєкту', fDescPh: 'Ваш продукт, що потрібно, бажані терміни.', fLink: 'Посилання на продукт або референс', fBudget: 'Бюджет',
    optional: '(необов’язково)', required: '(обов’язково)',
    budgets: [['', 'Не вказувати'], ['<100', 'До $100'], ['100-300', '$100–300'], ['300-600', '$300–600'], ['600+', '$600+']],
    eEmail: 'Будь ласка, вкажіть ваш email.', eEmailF: 'Схоже, в email є помилка — перевірте, будь ласка.', eDesc: 'Будь ласка, опишіть проєкт кількома словами.', eLink: 'Вкажіть повне посилання, що починається з https://',
    submit: 'Надіслати запит', sending: 'Надсилаю…', privacy: 'Ваші дані використовуються лише для відповіді.',
    successTitle: 'Дякую — ваш запит надіслано.', successBody: e => 'Я відповім на ' + e + ' якнайшвидше.', sendAnother: 'Надіслати ще один запит',
    errorTitle: 'Запит не надіслано.', errorNC: 'Форму ще не підключено до доставки на пошту. Будь ласка, надішліть запит email-ом — усе, що ви ввели, збережено.', errorGen: 'Щось пішло не так. Спробуйте ще раз або надішліть запит email-ом.',
    mailFallback: 'Відкрити в поштовому застосунку →', toTop: 'Нагору',
    similar: t => 'Хочу щось схоже на проєкт ' + t + '.'
  }
};

export const PKG = [
  { g: 'photo', items: [['p1', '$10', '1 photo', '1 фото'], ['p10', '$90', '10 photos', '10 фото'], ['p100', '$860', '100 photos', '100 фото']] },
  { g: 'video', items: [['v10', '$120', '10-second video', 'Відео 10 секунд'], ['v15', '$150', '15-second video', 'Відео 15 секунд'], ['v30', '$320', '30-second video', 'Відео 30 секунд'], ['anim', '$300', 'Animated film up to 1 minute', 'Анімаційний фільм до 1 хвилини']] },
  { g: 'campaign', items: [['c10', '$160', '10-second video + 5 photos', 'Відео 10 с + 5 фото'], ['c15', '$180', '15-second video + 5 photos', 'Відео 15 с + 5 фото']] }
];

export const A = import.meta.env.BASE_URL + 'assets/';
const ph = (k, w, h) => ({ src: A + k + '.jpg', w, h });
// ratio: '9/16' (vertical, the default) or '16/9' (Room 505)
const vid = (file, poster, dur, ratio = '9/16') => ({ src: A + 'video/' + file + '.mp4', poster: A + 'poster-' + poster + '.jpg', dur, ratio });
const DV = {
  camp: n => ({ en: [n + ' campaign photos', 'Vertical video · 9:16', 'Concept, art direction & edit'], ua: [n + ' фото для кампанії', 'Вертикальне відео · 9:16', 'Концепція, арт-дирекшн і монтаж'] }),
  photo: n => ({ en: [n + ' product photos', 'Concept & art direction'], ua: [n + ' фото продукту', 'Концепція та арт-дирекшн'] }),
  film: d => ({ en: ['Vertical video · ' + d + ' · 9:16', 'Concept, art direction & edit'], ua: ['Вертикальне відео · ' + d + ' · 9:16', 'Концепція, арт-дирекшн і монтаж'] })
};

const ALL_PROJECTS = [
  { id: 'ellips', kind: 'campaign', tags: ['campaign', 'photo', 'video'], title: { en: 'Ellips', ua: 'Ellips' },
    type: { en: 'Haircare campaign', ua: 'Кампанія для догляду за волоссям' }, cover: 'ellips-1', pos: '50% 40%',
    desc: { en: 'A glossy campaign for a vitamin hair mask: the tube framed by sculpted hair, condensation and warm pink light. Stills and film share one palette, so they work together on product pages and social.',
      ua: 'Глянцева кампанія для вітамінної маски для волосся: туба в обрамленні пасм, краплі конденсату й тепле рожеве світло. Фото й відео мають спільну палітру, тож працюють разом — на сторінці товару й у соцмережах.' },
    deliv: DV.camp(3), videos: [vid('ellips', 'ellips', '0:14')], photos: [ph('ellips-1', 1045, 1400), ph('ellips-2', 1047, 1400), ph('ellips-3', 1044, 1400)], sources: [] },
  { id: 'laneige', kind: 'campaign', tags: ['campaign', 'photo', 'video'], title: { en: 'Laneige', ua: 'Laneige' },
    type: { en: 'Skincare campaign', ua: 'Кампанія для догляду за шкірою' }, cover: 'laneige-2', pos: '50% 40%',
    desc: { en: 'A cool, airy world for a moisture cream — blue spheres, white cream textures and hands that make the jar feel tactile.',
      ua: 'Прохолодний, легкий світ для зволожувального крему: блакитні сфери, білі текстури крему й руки, що роблять баночку відчутною на дотик.' },
    deliv: DV.camp(3), videos: [vid('laneige', 'laneige', '0:11')], photos: [ph('laneige-1', 1045, 1400), ph('laneige-2', 1045, 1400), ph('laneige-3', 1045, 1400)], sources: [] },
  { id: 'ngd', kind: 'campaign', tags: ['campaign', 'photo', 'video'], title: { en: 'Raspberry Jewelry', ua: 'Малинові прикраси' },
    type: { en: 'Jewelry campaign', ua: 'Кампанія для прикрас' }, cover: 'ngd-1', pos: '50% 30%',
    desc: { en: 'A raspberry-inspired beaded necklace styled as something good enough to eat: ceramic plates, linen, soft daylight and real fruit.',
      ua: 'Намисто з бісеру, натхненне малиною, подане як щось апетитне: керамічні тарілки, льон, м’яке денне світло й справжні ягоди.' },
    deliv: DV.camp(4), videos: [vid('no-gramma-dramy', 'ni-gramma', '0:06')], photos: [ph('ngd-1', 900, 1200), ph('ngd-2', 1045, 1400), ph('ngd-3', 1045, 1400), ph('ngd-4', 768, 1376)], sources: [] },
  { id: 'centella', kind: 'photo', tags: ['photo'], title: { en: 'Centella · SKIN1004', ua: 'Centella · SKIN1004' },
    type: { en: 'Product photography', ua: 'Фото продукту' }, cover: 'centella-1', pos: '50% 50%',
    desc: { en: 'Four warm, golden images for a centella ampoule — liquid amber, satin, travertine and the botanical itself.',
      ua: 'Чотири теплі, золотаві кадри для ампули з центелою — бурштинова рідина, сатин, травертин і сама рослина.' },
    deliv: DV.photo(4), videos: [], photos: [ph('centella-1', 1045, 1400), ph('centella-3', 1045, 1400), ph('centella-2', 1120, 1400), ph('centella-4', 1120, 1400)],
    sources: [ph('centella-src', 1168, 1161)],
    sourceNote: { en: 'The series started from a standard white-background packshot. The bottle’s proportions, label and liquid colour were kept accurate; the light, surfaces and botanical story were built around them.',
      ua: 'Серія почалася зі звичайного пекшоту на білому тлі. Пропорції флакона, етикетку й колір рідини збережено точно, а світло, поверхні та історію рослини вибудувано навколо них.' } },
  { id: 'creamy', kind: 'photo', tags: ['photo'], title: { en: 'Creamy', ua: 'Creamy' }, note: { en: 'Fictional brand', ua: 'Вигаданий бренд' },
    type: { en: 'Product photography', ua: 'Фото продукту' }, cover: 'creamy-1', pos: '50% 60%',
    desc: { en: 'A still-photography series for an invented skincare brand, set in a pastel pink cream factory. Tubes in four colours travel along conveyor lines, sit under glass and rest beside fresh white cream.',
      ua: 'Фотосерія для вигаданого бренду догляду за шкірою на пастельно-рожевій фабриці крему. Туби чотирьох кольорів їдуть конвеєром, стоять під скляним ковпаком і лежать поруч зі свіжим білим кремом.' },
    deliv: { en: ['5 product photos', 'Brand world & art direction'], ua: ['5 фото продукту', 'Світ бренду та арт-дирекшн'] }, videos: [],
    photos: [ph('creamy-1', 1128, 1400), ph('creamy-3', 1128, 1400), ph('creamy-2', 1125, 1398), ph('creamy-4', 1128, 1400), ph('creamy-5', 1121, 1400)], sources: [] },
  { id: 'desir', kind: 'video', tags: ['video'], title: { en: 'DÉSIR', ua: 'DÉSIR' }, note: { en: 'Original concept', ua: 'Авторська концепція' },
    type: { en: 'Fragrance film', ua: 'Відео для аромату' }, cover: 'poster-desir', pos: '50% 50%',
    desc: { en: 'A dark, slow fragrance concept: a black panther moving through a wet, green jungle at night.',
      ua: 'Темна, повільна концепція аромату: чорна пантера рухається вологими нічними джунглями.' },
    deliv: DV.film('0:21'), videos: [vid('desir', 'desir', '0:21')], photos: [], sources: [] },
  { id: 'aurora', kind: 'video', tags: ['video'], title: { en: 'Aurora Vitamins', ua: 'Aurora Vitamins' },
    type: { en: 'Lifestyle film', ua: 'Lifestyle-відео' }, cover: 'poster-aurora', pos: '50% 40%',
    desc: { en: 'A warm lifestyle film for a vitamin brand — morning light, an unhurried kitchen ritual and everyday movement.',
      ua: 'Тепле lifestyle-відео для бренду вітамінів — ранкове світло, неквапливий ритуал на кухні й щоденний рух.' },
    deliv: DV.film('0:11'), videos: [vid('aurora', 'aurora', '0:11')], photos: [], sources: [] },
  { id: 'sunscreen', kind: 'video', tags: ['video'], title: { en: 'Sunscreen', ua: 'Sunscreen' },
    type: { en: 'Surreal product film', ua: 'Сюрреалістичне відео продукту' }, cover: 'poster-final-sunscreen', pos: '50% 50%',
    desc: { en: 'A surreal summer film: an oversized sunscreen tube rising above a Mediterranean-style cliffside pool.',
      ua: 'Сюрреалістичне літнє відео: величезна туба сонцезахисного крему над басейном на середземноморській скелі.' },
    deliv: DV.film('0:12'), videos: [vid('sunscreen', 'final-sunscreen', '0:12')], photos: [], sources: [] },
  { id: 'bags', kind: 'video', tags: ['video'], title: { en: 'Textured bags', ua: 'Фактурні сумки' },
    type: { en: 'Fashion film', ua: 'Fashion-відео' }, cover: 'poster-bags', pos: '50% 50%',
    desc: { en: 'Colourful fringed and furry bags on pedestals, each set against its own bold colour wall.',
      ua: 'Яскраві сумки з бахромою та хутром на подіумах — кожна на тлі власної насиченої кольорової стіни.' },
    deliv: DV.film('0:10'), videos: [vid('bags', 'bags', '0:10')], photos: [], sources: [] },
  { id: 'silver', kind: 'video', tags: ['video'], title: { en: 'Silver forms', ua: 'Срібні форми' },
    type: { en: 'Jewelry film', ua: 'Відео для прикрас' }, cover: 'poster-jwlr', pos: '50% 60%',
    desc: { en: 'A sculptural silver jewelry film — liquid metal lines flowing across dark, textured stone.',
      ua: 'Відео про скульптурні срібні прикраси — лінії рідкого металу на темному фактурному камені.' },
    deliv: DV.film('0:14'), videos: [vid('silver', 'jwlr', '0:14')], photos: [], sources: [] },
  { id: 'scene', kind: 'video', tags: ['video'], title: { en: 'Evening scene', ua: 'Вечірня сцена' },
    type: { en: 'Character-led fashion film', ua: 'Fashion-відео з персонажами' }, cover: 'poster-mc', pos: '50% 40%',
    desc: { en: 'A character-led fashion and jewelry scene: two figures, an old-world interior and a statement necklace.',
      ua: 'Сцена з персонажами для fashion і прикрас: дві постаті, старовинний інтер’єр і виразне намисто.' },
    deliv: DV.film('0:19'), videos: [vid('character-scene', 'mc', '0:19')], photos: [], sources: [] },

  // ---- Kept from the previous site (not in the v5 export) ----
  { id: 'room505', kind: 'video', tags: ['video'], title: { en: 'Room 505', ua: 'Room 505' }, note: { en: 'Original short film', ua: 'Авторський короткий метр' },
    type: { en: 'Short film · Psychological mystery', ua: 'Короткометражний фільм · Психологічна містика' }, cover: 'poster-room505', pos: '35% 50%',
    desc: { en: 'A hotel room that shouldn’t exist, and a guest who can’t remember checking in. A narrative short about memory, doubt and the door you keep returning to.',
      ua: 'Готельний номер, якого не мало б існувати, і гість, який не пам’ятає, як заселився. Наративна історія про пам’ять, сумнів і двері, до яких постійно повертаєшся.' },
    deliv: { en: ['Horizontal film · 0:50 · 16:9', 'Written, directed & edited'], ua: ['Горизонтальне відео · 0:50 · 16:9', 'Сценарій, режисура й монтаж'] },
    videos: [vid('room505', 'room505', '0:50', '16/9')], photos: [], sources: [] },
  { id: 'cupcake', kind: 'video', tags: ['video'], title: { en: 'Cupcake', ua: 'Cupcake' },
    type: { en: 'Animated short', ua: 'Анімаційна історія' }, cover: 'poster-cupcake', pos: '50% 45%',
    desc: { en: 'A small, sweet and slightly absurd story with characters who feel like they’ve always existed — a puppy’s story told with warmth and an emotional payoff.',
      ua: 'Маленька, солодка й трохи абсурдна історія з персонажами, які ніби існували завжди, — історія цуценяти, розказана тепло й зворушливо.' },
    deliv: DV.film('0:45'), videos: [vid('cupcake', 'cupcake', '0:45')], photos: [], sources: [] },
  { id: 'ugc', kind: 'video', tags: ['video', 'ugc'], title: { en: 'AI UGC — Skincare', ua: 'AI UGC — догляд за шкірою' },
    type: { en: 'AI UGC · Beauty content', ua: 'AI UGC · Б’юті-контент' }, cover: 'poster-ugc', pos: '50% 30%',
    desc: { en: 'A realistic skincare demonstration with virtual talent — natural product interactions and the easy, lived-in feel of lifestyle advertising.',
      ua: 'Реалістична демонстрація догляду за шкірою з віртуальною моделлю — природна взаємодія з продуктом і невимушена атмосфера лайфстайл-реклами.' },
    deliv: DV.film('0:26'), videos: [vid('ugc', 'ugc', '0:26')], photos: [], sources: [] }
];

// "Selected work": shown by default, in this order. "Show all work", the filters and the
// popup's previous/next use the same order: these first, then everything else.
export const FEATURED = ['ngd', 'centella', 'laneige', 'sunscreen', 'bags', 'ugc'];
export const PROJECTS = [
  ...FEATURED.map((id) => ALL_PROJECTS.find((p) => p.id === id)),
  ...ALL_PROJECTS.filter((p) => !FEATURED.includes(p.id))
];

export const HERO = { hero: ['hero1', 'hero1'], bags: ['bags', 'bags'], sunscreen: ['sunscreen', 'final-sunscreen'], laneige: ['laneige', 'laneige'], ellips: ['ellips', 'ellips'], desir: ['desir', 'desir'] };
export const EMPTY = { name: '', email: '', service: '', desc: '', link: '', budget: '', company: '' };

// ---- Site settings (were editable "props" in the design tool) ----
// Hero video: one of the HERO keys above — 'hero' (the showreel, hero1.mp4), or the design's
// options 'bags', 'sunscreen', 'laneige', 'ellips', 'desir'
export const HERO_VIDEO = 'hero';
// Inquiries go to EMAIL via formsubmit.co (first submission from a new domain sends a one-time activation email)
export const FORM_ENDPOINT = `https://formsubmit.co/ajax/${EMAIL}`;
