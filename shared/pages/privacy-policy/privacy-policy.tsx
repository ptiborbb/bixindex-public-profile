import Head from 'next/head';
import { FunctionComponent } from 'react';
import logo from '../../../public/bix_logo.svg';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { useTranslate } from '../../translate.context';
import classes from './privacy-policy.module.scss';

export const PrivacyPolicy: FunctionComponent = () => {
  const { t } = useTranslate();
  return (
    <>
      <Head>
        <title>{t('COMMON.PAGE_TITLE')}</title>
      </Head>
      <div className={classes.baseSize}>
        <div className={classes.headerBlock}>
          <div className={classes.container}>
            <Header logoPath={logo} />
          </div>
        </div>
      </div>
      <div className={classes.content}>
        <meta name="description" content="Tudd meg mik az előnyei, ha rendelkezel BIX felhasználóval!" />
        <meta property="og:title" content="Adatkezelési tájékoztató - BIX - Cégek, akikkel nyugodtan dolgozhatsz" />
        <meta property="og:description" content="Tudd meg mik az előnyei, ha rendelkezel BIX felhasználóval!" />
        <h4>
          BIX Hungary Kft. (székhely: 1095 Budapest, Soroksári út 48. 10.ép. 2/20., adószám: 26375078-2-43, cégjegyzék
          szám: 01-09-326936), a továbbiakban: Társaság.
        </h4>
        <p>
          A természetes személyeknek a személyes adatok kezelése tekintetében történő védelméről és az ilyen adatok
          szabad áramlásáról, valamint a 95/46/EK rendelet hatályon kívül helyezéséről szóló, AZ EURÓPAI PARLAMENT ÉS A
          TANÁCS (EU) 2016/679 RENDELETE (2016. április 27.) (általános adatvédelmi rendelet, a továbbiakban: Rendelet),
          továbbá az információs önrendelkezési jogról és az információszabadságról szóló 2011. évi CXII. törvény (a
          továbbiakban: Infotv.) szerint az érintettet az adatkezelés megkezdése előtt egyértelműen és részletesen
          tájékoztatni kell az adatai kezelésével kapcsolatos minden tényről, így különösen az adatkezelés céljáról és
          jogalapjáról, az adatkezelésre és az adatfeldolgozásra jogosult személyéről, illetve arról, hogy kik
          ismerhetik meg az adatokat, továbbá az érintett adatkezeléssel kapcsolatos jogairól és jogorvoslati
          lehetőségeiről. A jogszabályi kötelezettséget jelen tájékoztatóval teljesítem.
        </p>
        <p>
          A. Az adatkezelésre vonatkozó tájékoztatás
          <br />
          I. Adatkezelő
          <br />A Társaság teljes körű adatkezelési tevékenységét kizárólag BIX Hungary Kft. (székhely: 1095 Budapest,
          Soroksári út 48. 10.ép. 2/20., adószám: 26375078-2-43, cégjegyzék szám: 01-09-326936) végzi (a továbbiakban:
          Adatkezelő).
        </p>
        <meta name="description" content="Tudd meg kinek és miért érték a BIX!" />
        <meta property="og:title" content="Ellenőrzött Adatok - BIX - Cégek, akikkel nyugodtan dolgozhatsz" />
        <meta property="og:description" content="Tudd meg kinek és miért érték a BIX!" />
        <br />
        <br />
        <h5>Az Adatkezelő elérhetőségei:</h5>
        <br />
        <br />
        <p>Telefonszám: +36 30 419 0109</p>
        <br />
        <br />
        <p>E-mail cím: peter.gangel@bixindex.com</p>
        <br />
        <br />
        <p>Honlap: https://bixindex.hu</p>
        <br />
        <br />
        <p>
          II. Adatfeldolgozó
          <br />A Társaság nevében nem végez más adatkezelést, a Társaság nem vesz igénybe adatfeldolgozókat. A Társaság
          adatkezelője személyesen végzi a könyvelési, számviteli feladatokat, személyesen kezeli a Társaság honlapját
          és a hírlevél szolgáltatást. A Társaság honlapjának üzemeltetője és fejlesztője személyes adatokat nem kezel.
        </p>
        <br />
        <br />
        <h5>III. Hozzájáruláson alapuló adatkezelés</h5>
        <br />
        <br />
        <p>
          A Társaság által nyújtott szolgáltatás magasabb színvonalon történő nyújtásához szükség van az érintett
          bizonyos személyes adatainak kezelésére. Ezek a személyes adatok a Rendelet szerint a különleges kategóriába
          esőnek minősülnek, így az adatkezeléshez az érintett kifejezett hozzájárulása szükséges. Az adatok megadása a
          szerződés teljesítéséhez nem elengedhetetlen. Az érintett hozzájárulása a konkrét üggyel kapcsolatos
          adatkezelési tevékenységre terjed ki, ha az adatkezelés több ügyet érint, akkor a Társaság az összes
          adatkezelési célra vonatkozóan megkéri a hozzájárulást. Ha az érintett hozzájárulását olyan írásbeli
          nyilatkozat keretében adja meg, amely más ügyekre is vonatkozik, a hozzájárulás iránti kérelmet ezektől a más
          ügyektől egyértelműen megkülönböztethető módon kell előadni, érthető és könnyen hozzáférhető formában, világos
          és egyszerű nyelvezettel. Az érintett hozzájárulását tartalmazó ilyen nyilatkozat bármely olyan része, amely
          sérti e szabályzatot, vagy a vonatkozó jogszabályokat, kötelező erővel nem bír. Az érintett jogosult arra,
          hogy hozzájárulását bármikor visszavonja. A hozzájárulás visszavonása nem érinti a hozzájáruláson alapuló, a
          visszavonás előtti adatkezelés jogszerűségét. A Társaság kizárólag olyan adatokat kezel, amelyek az adott ügy
          viteléhez (szerződés teljesítéséhez) szükségesek. Amennyiben az érintett hozzájárult a személyes adatainak
          kezeléséhez, a Társaság a rá vonatkozó jogi kötelezettség teljesítése érdekében, illetve az adatkezelő vagy
          harmadik személy jogos érdekének érvényesítése céljából, ha ezen érdek érvényesítése a személyes adatok
          védelméhez fűződő jog korlátozásával arányban áll – törvény eltérő rendelkezésének hiányában –, az adatokat
          külön erre vonatkozó hozzájárulás nélkül, illetve a hozzájárulás visszavonását követően is kezelheti. A
          Társaság az érintett hozzájárulása alapján az alábbi személyes adatokat kezeli:
        </p>
        <br />
        <p>a) email cím,</p>
        <p>b) telefonszám,</p>
        <p>c.) cégadatok.</p>
        <p>Az adatkezelés jogalapja az érintett hozzájárulása.</p>
        <br />
        <p>Az adatok tárolásának időtartama:</p>
        <p>a) az érintettel kötött szerződés megszűnését követő 5 évig, vagy</p>
        <p>b) a hozzájárulás visszavonásáig,</p>
        <p>
          c) jelen cikk (6) bekezdésében foglalt adatkezelés esetén a jogi kötelezettségek teljesítéséig, vagy ajogos
          érdekek érvényesítéséig.
        </p>
        <br />
        <h5>IV. Szerződéshez kapcsolódó adatkezelés:</h5>
        <p>
          A Társaság a szerződésekkel összefüggésben, a szerződés teljesítése céljából kezeli a vele bármilyen
          minőségben szerződött természetes személy adatait. <br />A Társaság a szerződésekkel összefüggésben az alábbi
          személyes adatokat kezeli:
        </p>
        <br />
        <p>név,</p>
        <p>telefonszám,</p>
        <p>e-mail cím.</p>
        <p>Az adatkezelés jogalapja a szerződés teljesítése.</p>
        <p>
          Az adatok tárolásának időtartama a szerződés megszűnését követő 5 év, kivéve, ha jogszabály más időtartamot
          határoz meg.
        </p>
        <h5>V. A Társaság honlapjához kapcsolódó adatkezelés</h5>
        <p>
          A cookie-k – magyar nevükön sütik – kisméretű adatfájlok, melyeket a böngészés során a webhely az oldalaira
          látogató számítógépén, illetve mobilkészülékén helyez el. A cookie nem tartalmaz személyes információkat, és
          önmagában nem képes a felhasználó azonosítására, kizárólag a böngészésre használt eszköz felismerésére
          alkalmas. A sütik segítségével a honlap bizonyos ideig megjegyzi a felhasználó egyes műveleteit és
          beállításait, ezzel megkönnyíti a honlap használatát és statisztikai jellegű információkat gyűjt a
          látogatóinkról. Az Európai Bizottság irányelvei alapján, amennyiben azok az adott szolgáltatás használatához
          nem elengedhetetlenül szükségesek, cookie-kat csak a felhasználó kifejezett engedélyével lehet elhelyezni.A
          honlap használ ideiglenes cookie-t, amely a honlap bezárása után megszűnik, illetve állandó cookie-t, amely a
          felhasználó általi törlésig a számítógépen marad. Bizonyos cookie-k nélkülözhetetlenek a honlap használatához,
          míg vannak olyan típusú cookie-k, amelyek a felhasználói élmény javítását szolgálják. A honlap használatához
          elengedhetetlenül szükséges cookie-k lehetővé teszik a weboldal alapvető funkcióinak használatát, ezek
          hiányában számos funkció nem elérhető. Ezen cookie-k esetében az adatkezelés kizárólag a böngészés ideje alatt
          történik, a munkamenet végeztével, illetve a böngésző bezárásával a cookie-k törlődnek. Az ilyen típusú
          cookie-k használata nem igényli a felhasználó hozzájárulását, arról a honlapon történő első látogatás
          alkalmával kell tájékoztatást adni akként, hogy a honlapon a tájékoztatás lényegének összefoglalása
          megtalálható, emellett egy linken keresztül érhető el a teljes tájékoztató. A Társaság honlapján a különböző
          típusú cookie-kra vonatkozó tájékoztatás és a hozzájárulás összevonva található. A felhasználói élmény
          javítását szolgáló cookie-k célja alapvetően a szolgáltatás hatékonyságának növelése, a honlap használatának
          kényelmesebbé tétele, emellett a teljesítmény javítására szolgálnak. Az ilyen típusú cookie-k használatához
          szükséges az adatkezelést megelőzően a felhasználó kifejezett hozzájárulása, ez a hozzájárulás kizárólag aktív
          magatartással adható meg, az erre vonatkozó szöveg bejelölésével. A hozzájárulással együtt az ilyen típusú
          cookie-k használatáról is tájékoztatást kell adni akként, hogy a honlapon a tájékoztatás lényegének
          összefoglalása megtalálható, emellett egy linken keresztül érhető el a teljes tájékoztató. A Társaság a
          cookie-k használatával összefüggésben kizárólag a felhasználó egyes műveleteire és beállításaira vonatkozó
          adatokat kezel, nem kezeli a felhasználók személyes adatait, illetve ezekből az adatokból nem lehetséges a
          felhasználó beazonosítása. A felhasználó a honlap használata során ezen adatkezelést bármikor megtilthatja. A
          kezelt adatokat a Társaság nem kapcsolja össze a felhasználó egyéb adataival, és a felhasználó hozzájárulása
          nélkül nem adja át harmadik személynek. A Társaság honlapján alkalmazott programok a használat során az alábbi
          adatokat rögzítik és kezelik:
        </p>
        <br />
        <p>felhasználó által használt IP cím,</p>
        <p>böngésző típusa,</p>
        <p>operációs rendszer jellemzői,</p>
        <p>böngészés időpontja,</p>
        <p>a honlapon végzett tevékenység.</p>
        <p>A Társaság a honlapon az alábbi cookie-kat alkalmazza:</p>
        <p>Google Analytics</p>
        <br />
        <br />
        <p>
          Az adatkezelés jogalapja a honlap használatához elengedhetetlenül szükséges cookie-k esetében az elektronikus
          kereskedelmi szolgáltatások, valamint az információs társadalmi szolgáltatások egyes kérdéseiről szóló 2001.
          CVIII. törvény (Elkertv.) 13/A. § (3) bekezdése, míg a felhasználói élmény javítását szolgáló cookie-k
          esetében a felhasználó hozzájárulása.
        </p>
        <br />
        <br />
        <p>Az adatok tárolásának időtartama:</p>
        <p>
          honlap használatához elengedhetetlenül szükséges cookie-k: a munkamenet végéig, illetve a böngésző bezárásáig,
          felhasználói élmény javítását szolgáló cookie-k: a felhasználó böngésző eszközén a felhasználó által a
          böngészési előzmények törléséig.
        </p>
        <br />
        <h5>VI. A Társaság hírlevél szolgáltatásához kapcsolódó adatkezelés</h5>
        <p>
          A honlapon a felhasználóknak lehetősége van feliratkozni a Társaság hírlevelére. A hírlevél szolgáltatásra
          való feliratkozáshoz szükséges a felhasználó kifejezett hozzájárulása, ez a hozzájárulás kizárólag aktív
          magatartással adható meg, a hírlevél küldéséhez szükséges adatok megadásával, és a személyes adatok
          kezeléséhez való hozzájárulásra vonatkozó négyzet felhasználó általi bejelölésével. A felhasználó a
          hozzájárulását bármikor visszavonhatja, írásban vagy a Társaság e-mail címére megküldött nyilatkozattal, ilyen
          esetben a felhasználó adatai haladéktalanul törlésre kerülnek. A Társaság által a hírlevél szolgáltatással
          kapcsolatosan kezelt adatok:
        </p>
        <br />
        <p>felhasználó teljes neve,</p>
        <p>felhasználó e-mail címe.</p>
        <p>
          A hírlevél szolgáltatással kapcsolatos adatkezelés célja a felhasználó tájékoztatása a Társaság programjairól
          és szolgáltatásairól.
        </p>
        <p>A hírlevél szolgáltatással kapcsolatos adatkezelés jogalapja az érintett hozzájárulása.</p>
        <p>A hírlevél szolgáltatással kapcsolatos adatok tárolásának időtartama:</p>
        <p>a hírlevél szolgáltatás megszűnéséig, vagy a hozzájárulás visszavonásáig.</p>
        <br />
        <h5>VII. A Társaság Facebook oldalához kapcsolódó adatkezelés</h5>
        <p>
          A Társaság a programjainak és szolgáltatásainak ismertetésére Facebook oldalt tart fenn. A Társaság Facebook
          oldalán található posztokhoz történő hozzászólás nem minősül a Társaság felé formális megkeresésnek. A
          Társaság a Facebook oldalán, illetve ahhoz kapcsolódóan nem kezel személyes adatot, így a felhasználó által
          közzétett személyes adatot sem, a felhasználókra a Facebook adatkezelési szabályzata az irányadó{' '}
          <a href="https://www.facebook.com/privacy/explanation">(https://www.facebook.com/privacy/explanation).</a>A
          Társaság fenntartja magának a jogot, hogy a Facebook használati feltételeit
          <a href="https://www.facebook.com/policies?ref=pf">(https://www.facebook.com/policies?ref=pf)</a>sértő, vagy
          egyébként jogellenes, illetve a Társaság filozófiájával és üzletpolitikájával össze nem egyeztethető
          hozzászólás vagy ilyen tartalom közzététele esetén további értesítés nélkül letiltsa az érintettet és/vagy
          törölje a hozzászólást. A Társaság semmiféle felelősséget nem vállal az ilyen hozzászólásért vagy tartalomért.
        </p>
        <br />
        <h5>VIII. Jogi kötelezettségen alapuló adatkezelés:</h5>
        <p>
          A Társaság törvényben előírt adó és számviteli kötelezettségek teljesítése céljából kezeli a vele üzleti
          kapcsolatba lépő természetes személyek törvényben meghatározott adatait. A Társaság jogi kötelezettség
          teljesítése céljából az alábbi személyes adatokat kezeli:
        </p>
        <br />
        <p>a) név,</p>
        <p>b) lakcím.</p>
        <p>
          Az adatkezelés jogalapja a Társaságra vonatkozó jogi kötelezettség teljesítése. Az adatok tárolásának
          időtartama az alapul szolgáló jogviszony megszűnését követő 8 év.
        </p>
        <h5>IX. Adatvédelem</h5>
        <p>
          A Társaság a tudomány és technológia állása és a megvalósítás költségei, továbbá az adatkezelés jellege,
          hatóköre, körülményei és céljai, valamint a természetes személyek jogaira és szabadságaira jelentett, változó
          valószínűségű és súlyosságú kockázat figyelembevételével mind az adatkezelés módjának meghatározásakor, mind
          pedig az adatkezelés során olyan megfelelő technikai és szervezési intézkedéseket – például álnevesítést –
          hajt végre, amelyek célja egyrészt az adatvédelmi elvek, például az adattakarékosság hatékony megvalósítása,
          másrészt az e rendeletben foglalt követelmények teljesítéséhez és az érintettek jogainak védelméhez szükséges
          garanciák beépítése az adatkezelés folyamatába. A Társaság megfelelő technikai és szervezési intézkedéseket
          hajt végre annak biztosítására, hogy alapértelmezés szerint kizárólag olyan személyes adatok kezelésére
          kerüljön sor, amelyek az adott konkrét adatkezelési cél szempontjából szükségesek. Ez a kötelezettség
          vonatkozik a gyűjtött személyes adatok mennyiségére, kezelésük mértékére, tárolásuk időtartamára és
          hozzáférhetőségükre. Ezek az intézkedések különösen azt kell, hogy biztosítsák, hogy a személyes adatok
          alapértelmezés szerint a természetes személy beavatkozása nélkül ne válhassanak hozzáférhetővé meghatározatlan
          számú személy számára. A Társaság honlapja RapidSSL tanúsítvánnyal van ellátva. <br />A Társaság által
          adatkezelésre és az adatok nyilvántartására használt számítógép a Windows 10 beépített vírusvédelmi
          programjával (Windows Defender) és jelszóval védett. A Társaság által papíralapon kezelt adatok a Társaság
          székhelyén, zárható szekrényben kerülnek tárolásra.
        </p>
        <br />
        <p>B. Az érintett jogai</p>
        <br />
        <h5>I. Átláthatóság és intézkedések</h5>
        <p>
          A Társaság vállalja, hogy az érintett részére a személyes adatok kezelésére vonatkozó valamennyi információt
          és tájékoztatást tömör, átlátható, érthető és könnyen hozzáférhető formában, világosan és közérthetően
          megfogalmazva nyújtja, különösen a gyermekeknek címzett bármely információ esetében. Az információkat az
          érintett választása szerint írásban vagy elektronikus úton adja meg, de az érintett kérésére szóbeli
          tájékoztatás is adható, feltéve, hogy más módon igazolták az érintett személyazonosságát. A Társaság elősegíti
          az érintett jogainak a gyakorlását. Az 1. Fejezet II/5. b) pontban említett esetekben a Társaság az érintett
          jogai gyakorlására irányuló kérelmének a teljesítését nem tagadhatja meg, kivéve, ha bizonyítja, hogy az
          érintettet nem áll módjában azonosítani. Társaság indokolatlan késedelem nélkül, de mindenféleképpen a kérelem
          beérkezésétől számított egy hónapon belül tájékoztatja az érintettet a kérelem nyomán hozott intézkedésekről.
          Szükség esetén, figyelembe véve a kérelem összetettségét és a kérelmek számát, ez a határidő további két
          hónappal meghosszabbítható. A határidő meghosszabbításáról a Társaság a késedelem okainak megjelölésével a
          kérelem kézhezvételétől számított egy hónapon belül tájékoztatja az érintettet. Ha az érintett elektronikus
          úton nyújtotta be a kérelmet, a tájékoztatást lehetőség szerint elektronikus úton kell megadni, kivéve, ha az
          érintett azt másként kéri. A Társaság nem tesz intézkedéseket az érintett kérelme nyomán, késedelem nélkül, de
          legkésőbb a kérelem beérkezésétől számított egy hónapon belül tájékoztatja az érintettet az intézkedés
          elmaradásának okairól, valamint arról, hogy az érintett panaszt nyújthat be valamely felügyeleti hatóságnál,
          és élhet bírósági jogorvoslati jogával. A Társaság az információkat, illetve a tájékoztatást és intézkedést
          díjmentesen biztosítja. Ha az érintett kérelme egyértelműen megalapozatlan vagy – különösen ismétlődő jellege
          miatt – túlzó, a Társaság, figyelemmel a kért információ vagy tájékoztatás nyújtásával vagy a kért intézkedés
          meghozatalával járó adminisztratív költségekre észszerű összegű díjat számíthat fel, vagy megtagadhatja a
          kérelem alapján történő intézkedést. A kérelem egyértelműen megalapozatlan vagy túlzó jellegének bizonyítása a
          Társaságot terheli. Ha Társaságnak megalapozott kétségei vannak a kérelmet benyújtó természetes személy
          kilétével kapcsolatban, további, az érintett személyazonosságának megerősítéséhez szükséges információk
          nyújtását kérheti. Az érintett részére a következő szakasz alapján nyújtandó információkat szabványosított
          ikonokkal is ki lehet egészíteni annak érdekében, hogy a tervezett adatkezelésről az érintett jól látható,
          könnyen érthető és jól olvasható formában kapjon általános tájékoztatást. Az elektronikusan megjelenített
          ikonoknak géppel olvashatónak kell lenniük.
        </p>
        <h5>II. Tájékoztatás és a személyes adatokhoz való hozzáférés</h5>
        <p>
          Ha az érintettre vonatkozó személyes adatokat az érintettől gyűjtik, a Társaság a személyes adatok
          megszerzésének időpontjában az érintett rendelkezésére bocsátja a következő információk mindegyikét, ill.
          tájékoztatja az alábbiakról: az adatkezelőnek és – ha van ilyen – az adatkezelő képviselőjének a kiléte és
          elérhetőségei; az adatvédelmi tisztviselő elérhetőségei, ha van ilyen; a személyes adatok tervezett
          kezelésének célja, valamint az adatkezelés jogalapja; amennyiben az adatkezelés az adatkezelő vagy egy
          harmadik fél jogos érdekeinek érvényesítéséhez szükséges, az adatkezelő vagy harmadik fél jogos érdekei; adott
          esetben a személyes adatok címzettjei, illetve a címzettek kategóriái, ha van ilyen; a személyes adatok
          tárolásának időtartama, vagy ha ez nem lehetséges, ezen időtartam meghatározásának szempontjai; az érintett
          kérelmezheti az adatkezelőtől a rá vonatkozó személyes adatokhoz való hozzáférést, azok helyesbítését,
          törlését vagy kezelésének korlátozását, és tiltakozhat az ilyen személyes adatok kezelése ellen, valamint joga
          van az adathordozhatósághoz; az érintett hozzájárulásán alapuló adatkezelés esetén a hozzájárulás bármely
          időpontban történő visszavonásához való jog, amely nem érinti a visszavonás előtt a hozzájárulás alapján
          végrehajtott adatkezelés jogszerűségét; a felügyeleti hatósághoz címzett panasz benyújtásának jogáról; arról,
          hogy a személyes adat szolgáltatása jogszabályon vagy szerződéses kötelezettségen alapul vagy szerződés
          kötésének előfeltétele-e, valamint hogy az érintett köteles-e a személyes adatokat megadni, továbbá hogy
          milyen lehetséges következményeikkel járhat az adatszolgáltatás elmaradása; <br />
          Ha a Társaság a személyes adatokon a gyűjtésük céljától eltérő célból további adatkezelést kíván végezni, a
          további adatkezelést megelőzően tájékoztatnia kell az érintettet erről az eltérő célról és az 1. bekezdésben
          említett minden releváns kiegészítő információról.
        </p>
        <br />
        <p>A bekezdés nem alkalmazandó, ha és amilyen mértékben az érintett már rendelkezik az információkkal.</p>
        <br />
        <p>
          Ha a személyes adatokat nem az érintettől szerezték meg, az adatkezelő az érintett rendelkezésére bocsátja a
          következő információkat:
        </p>
        <br />
        <p>az (1) bekezdés a)-i) és k) pontjaiban felsoroltak;</p>
        <p>az érintett személyes adatok kategóriái;</p>
        <p>
          a személyes adatok forrása és adott esetben az, hogy az adatok nyilvánosan hozzáférhető forrásokból
          származnak-e.
        </p>
        <br />
        <p>A Társaság a (2) bekezdés szerinti tájékoztatást az alábbiak szerint adja meg:</p>
        <p>
          a személyes adatok kezelésének konkrét körülményeit tekintetbe véve, a személyes adatok megszerzésétől
          számított észszerű határidőn, de legkésőbb egy hónapon belül; ha a személyes adatokat az érintettel való
          kapcsolattartás céljára használják, legalább az érintettel való első kapcsolatfelvétel alkalmával; vagy ha
          várhatóan más címzettel is közlik az adatokat, legkésőbb a személyes adatok első alkalommal való közlésekor.
          Ha a Társaság a személyes adatokon a megszerzésük céljától eltérő célból további adatkezelést kíván végezni, a
          további adatkezelést megelőzően tájékoztatnia kell az érintettet erről az eltérő célról és a 2. bekezdésben
          említett minden releváns kiegészítő információról.
        </p>
        <br />
        <p>A bekezdés nem alkalmazandó, ha és amilyen mértékben</p>
        <br />
        <p>
          az érintett már rendelkezik az információkkal; a szóban forgó információk rendelkezésre bocsátása
          lehetetlennek bizonyul, vagy aránytalanul nagy erőfeszítést igényelne, különösen a közérdekű archiválás
          céljából, tudományos és történelmi kutatási célból vagy statisztikai célból végzett adatkezelés esetében, vagy
          amennyiben az e bekezdésben említett kötelezettség valószínűsíthetően lehetetlenné tenné vagy komolyan
          veszélyeztetné ezen adatkezelés céljainak elérését. Ilyen esetekben az adatkezelőnek megfelelő intézkedéseket
          kell hoznia – az információk nyilvánosan elérhetővé tételét is ideértve – az érintett jogainak, szabadságainak
          és jogos érdekeinek védelme érdekében; az adat megszerzését vagy közlését kifejezetten előírja az adatkezelőre
          alkalmazandó uniós vagy tagállami jog, amely az érintett jogos érdekeinek védelmét szolgáló megfelelő
          intézkedésekről rendelkezik; vagy a személyes adatoknak valamely uniós vagy tagállami jogban előírt szakmai
          titoktartási kötelezettség alapján, ideértve a jogszabályon alapuló titoktartási kötelezettséget is,
          bizalmasnak kell maradnia.
        </p>
        <h5>III. Az érintett hozzáférési joga</h5>
        <p>
          Az érintett jogosult arra, hogy a Társaságtól visszajelzést kapjon arra vonatkozóan, hogy személyes adatainak
          kezelése folyamatban van-e, és ha ilyen adatkezelés folyamatban van, jogosult arra, hogy a személyes adatokhoz
          és a következő információkhoz hozzáférést kapjon:
        </p>
        <br />
        <p>az adatkezelés céljai;</p>
        <p>az érintett személyes adatok kategóriái;</p>
        <p>
          azon címzettek vagy címzettek kategóriái, akikkel, illetve amelyekkel a személyes adatokat közölték vagy
          közölni fogják, ideértve különösen a harmadik országbeli címzetteket, illetve a nemzetközi szervezeteket;
        </p>
        <p>
          adott esetben a személyes adatok tárolásának tervezett időtartama, vagy ha ez nem lehetséges, ezen időtartam
          meghatározásának szempontjai;
        </p>
        <p>
          az érintett azon joga, hogy kérelmezheti az adatkezelőtől a rá vonatkozó személyes adatok helyesbítését,
          törlését vagy kezelésének korlátozását, és tiltakozhat az ilyen személyes adatok kezelése ellen;
        </p>
        <p>a valamely felügyeleti hatósághoz címzett panasz benyújtásának joga;</p>
        <p>
          ha az adatokat nem az érintettől gyűjtötték, a forrásukra vonatkozó minden elérhető információ. A Társaság az
          adatkezelés tárgyát képező személyes adatok másolatát az érintett rendelkezésére bocsátja. Az érintett által
          kért további másolatokért az adatkezelő az adminisztratív költségeken alapuló, észszerű mértékű díjat
          számíthat fel. Ha az érintett elektronikus úton nyújtotta be a kérelmet, az információkat széles körben
          használt elektronikus formátumban kell rendelkezésre bocsátani, kivéve, ha az érintett másként kéri. <br />A
          (2) bekezdésben említett, másolat igénylésére vonatkozó jog nem érintheti hátrányosan mások jogait és
          szabadságait.
        </p>
        <h5>IV. A helyesbítéshez való jog</h5>
        <p>
          Az érintett jogosult arra, hogy kérésére a Társaság indokolatlan késedelem nélkül helyesbítse a rá vonatkozó
          pontatlan személyes adatokat. Figyelembe véve az adatkezelés célját, az érintett jogosult arra, hogy kérje a
          hiányos személyes adatok – egyebek mellett kiegészítő nyilatkozat útján történő – kiegészítését.
        </p>
        <br />
        <h5>V. A törléshez való jog („az elfeledtetéshez való jog”)</h5>
        <br />
        <p>
          Az érintett jogosult arra, hogy kérésére a Társaság indokolatlan késedelem nélkül törölje a rá vonatkozó
          személyes adatokat, a Társaság pedig köteles arra, hogy az érintettre vonatkozó személyes adatokat
          indokolatlan késedelem nélkül törölje, ha az alábbi indokok valamelyike fennáll: a személyes adatokra már
          nincs szükség abból a célból, amelyből azokat gyűjtötték vagy más módon kezelték; <br />
          az érintett visszavonja az adatkezelés alapját képező hozzájárulását, és az adatkezelésnek nincs más
          jogalapja; <br />
          az érintett a 3. Fejezet IX. cikk (1) bekezdése alapján tiltakozik az adatkezelés ellen, és nincs elsőbbséget
          élvező jogszerű ok az adatkezelésre, vagy az érintett a 3. Fejezet IX. cikk (2) bekezdése alapján tiltakozik
          az adatkezelés ellen; <br />a személyes adatokat jogellenesen kezelték; <br />a személyes adatokat az
          adatkezelőre alkalmazandó uniós vagy tagállami jogban előírt jogi kötelezettség teljesítéséhez törölni kell;{' '}
          <br />a személyes adatok gyűjtésére az 1. Fejezet II. cikk (3) bekezdés a) pontjában említett, információs
          társadalommal összefüggő szolgáltatások kínálásával kapcsolatosan került sor. Ha a Társaság nyilvánosságra
          hozta a személyes adatot, és az (1) bekezdés értelmében azt törölni köteles, az elérhető technológia és a
          megvalósítás költségeinek figyelembevételével megteszi az észszerűen elvárható lépéseket – ideértve technikai
          intézkedéseket – annak érdekében, hogy tájékoztassa az adatokat kezelő adatkezelőket, hogy az érintett
          kérelmezte tőlük a szóban forgó személyes adatokra mutató linkek vagy e személyes adatok másolatának, illetve
          másodpéldányának törlését. Az (1) és (2) bekezdés nem alkalmazandó, amennyiben az adatkezelés szükséges: a
          véleménynyilvánítás szabadságához és a tájékozódáshoz való jog gyakorlása céljából; a személyes adatok
          kezelését előíró, a Társaságra alkalmazandó uniós vagy tagállami jog szerinti kötelezettség teljesítése,
          illetve közérdekből vagy a Társaságra ruházott közhatalmi jogosítvány gyakorlása keretében végzett feladat
          végrehajtása céljából; jogi igények előterjesztéséhez, érvényesítéséhez, illetve védelméhez.
        </p>
        <br />
        <h5>VI. Az adatkezelés korlátozásához való jog</h5>
        <br />
        <p>
          Az érintett jogosult arra, hogy kérésére a Társaság korlátozza az adatkezelést, ha az alábbiak valamelyike
          teljesül: <br />
          az érintett vitatja a személyes adatok pontosságát, ez esetben a korlátozás arra az időtartamra vonatkozik,
          amely lehetővé teszi, hogy a Társaság ellenőrizze a személyes adatok pontosságát; az adatkezelés jogellenes,
          és az érintett ellenzi az adatok törlését, és ehelyett kéri azok felhasználásának korlátozását; <br />a
          Társaságnak már nincs szüksége a személyes adatokra adatkezelés céljából, de az érintett igényli azokat jogi
          igények előterjesztéséhez, érvényesítéséhez vagy védelméhez; vagy az érintett a 3. Fejezet IX. cikk (1)
          bekezdése szerint tiltakozott az adatkezelés ellen; ez esetben a korlátozás arra az időtartamra vonatkozik,
          amíg megállapításra nem kerül, hogy a Társaság jogos indokai elsőbbséget élveznek-e az érintett jogos
          indokaival szemben. Ha az adatkezelés az (1) bekezdés alapján korlátozás alá esik, az ilyen személyes adatokat
          a tárolás kivételével csak az érintett hozzájárulásával, vagy jogi igények előterjesztéséhez, érvényesítéséhez
          vagy védelméhez, vagy más természetes vagy jogi személy jogainak védelme érdekében, vagy az Unió, illetve
          valamely tagállam fontos közérdekéből lehet kezelni. A Társaság az érintettet, akinek a kérésére az (1)
          bekezdés alapján korlátozták az adatkezelést, az adatkezelés korlátozásának feloldásáról előzetesen
          tájékoztatja.
        </p>
        <br />
        <h5>VII. Tájékoztatás helyesbítésről, törlésről vagy adatkezelés-korlátozásról</h5>
        <br />
        <p>
          A Társaság minden olyan címzettet tájékoztat a fentiek szerinti valamennyi helyesbítésről, törlésről vagy
          adatkezelés-korlátozásról, akivel, illetve amellyel a személyes adatot közölték, kivéve, ha ez lehetetlennek
          bizonyul, vagy aránytalanul nagy erőfeszítést igényel. Az érintettet kérésére a Társaság tájékoztatja e
          címzettekről.
        </p>
        <br />
        <h5>VIII. Az adathordozhatósághoz való jog</h5>
        <br />
        <p>
          Az érintett jogosult arra, hogy a rá vonatkozó, általa egy adatkezelő rendelkezésére bocsátott személyes
          adatokat tagolt, széles körben használt, géppel olvasható formátumban megkapja, továbbá jogosult arra, hogy
          ezeket az adatokat egy másik adatkezelőnek továbbítsa anélkül, hogy ezt akadályozná az az adatkezelő, amelynek
          a személyes adatokat a rendelkezésére bocsátotta, ha az adatkezelés az 1. fejezet II. cikk (2) bekezdés a)
          pontja vagy az 1. fejezet II. cikk (4) bekezdése szerinti hozzájáruláson, vagy az 1. fejezet II. cikk (2)
          bekezdés b) pontja szerinti szerződésen alapul; és az adatkezelés automatizált módon történik. <br />
          Az adatok hordozhatóságához való jog (1) bekezdés szerinti gyakorlása során az érintett jogosult arra, hogy –
          ha ez technikailag megvalósítható – kérje a személyes adatok adatkezelők közötti közvetlen továbbítását.{' '}
          <br />
          Az (1) bekezdésben említett jog gyakorlása nem sértheti a törléshez való jogot szabályozó rendelkezéseket. Az
          említett jog nem alkalmazandó abban az esetben, ha az adatkezelés közérdekű vagy a Társaságra ruházott
          közhatalmi jogosítványai gyakorlásának keretében végzett feladat végrehajtásához szükséges. <br />
          Az (1) bekezdésben említett jog nem érintheti hátrányosan mások jogait és szabadságait.
        </p>
        <br />
        <h5>IX. A tiltakozáshoz való jog</h5>
        <br />
        <p>
          Az érintett jogosult arra, hogy a saját helyzetével kapcsolatos okokból bármikor tiltakozzon személyes
          adatainak kezelése ellen – ideértve az említett rendelkezéseken alapuló profilalkotást is –, ha az adatkezelés
          közérdekű vagy a Társaságra ruházott közhatalmi jogosítvány gyakorlásának keretében végzett feladat
          végrehajtásához, illetve a Társaság vagy egy harmadik fél jogos érdekeinek érvényesítéséhez szükséges. <br />
          Ebben az esetben a Társaság a személyes adatokat nem kezelheti tovább, kivéve, ha a Társaság bizonyítja, hogy
          az adatkezelést olyan kényszerítő erejű jogos okok indokolják, amelyek elsőbbséget élveznek az érintett
          érdekeivel, jogaival és szabadságaival szemben, vagy amelyek jogi igények előterjesztéséhez, érvényesítéséhez
          vagy védelméhez kapcsolódnak.
        </p>
        <br />
        <p>
          Ha a személyes adatok kezelése közvetlen üzletszerzés érdekében történik, az érintett jogosult arra, hogy
          bármikor tiltakozzon a rá vonatkozó személyes adatok e célból történő kezelése ellen, ideértve a
          profilalkotást is, amennyiben az a közvetlen üzletszerzéshez kapcsolódik. Ha az érintett tiltakozik a
          személyes adatok közvetlen üzletszerzés érdekében történő kezelése ellen, akkor a személyes adatok a
          továbbiakban e célból nem kezelhetők. Az (1) és (2) bekezdésben említett jogra legkésőbb az érintettel való
          első kapcsolatfelvétel során kifejezetten fel kell hívni annak figyelmét, és az erre vonatkozó tájékoztatást
          egyértelműen és minden más információtól elkülönítve kell megjeleníteni. Az információs társadalommal
          összefüggő szolgáltatások igénybevételéhez kapcsolódóan és a 2002/58/EK irányelvtől eltérve az érintett a
          tiltakozáshoz való jogot műszaki előírásokon alapuló automatizált eszközökkel is gyakorolhatja.
        </p>
        <br />
        <h5>X. Az érintett tájékoztatása az adatvédelmi incidensről</h5>
        <br />
        <p>
          Ha az adatvédelmi incidens valószínűsíthetően magas kockázattal jár a természetes személyek jogaira és
          szabadságaira nézve, a Társaság indokolatlan késedelem nélkül tájékoztatja az érintettet az adatvédelmi
          incidensről. <br />
          Az (1) bekezdésben említett, az érintett részére adott tájékoztatásban világosan és közérthetően ismertetni
          kell az adatvédelmi incidens jellegét, és közölni kell legalább az előző cikk (3) bekezdésének b), c) és d)
          pontjában említett információkat és intézkedéseket. Az érintettet nem kell az (1) bekezdésben említettek
          szerint tájékoztatni, ha a következő feltételek bármelyike teljesül:
        </p>
        <br />
        <p>
          a Társaság megfelelő technikai és szervezési védelmi intézkedéseket hajtott végre, és ezeket az intézkedéseket
          az adatvédelmi incidens által érintett adatok tekintetében alkalmazták, különösen azokat az intézkedéseket –
          mint például a titkosítás alkalmazása –, amelyek a személyes adatokhoz való hozzáférésre fel nem jogosított
          személyek számára értelmezhetetlenné teszik az adatokat;
        </p>
        <p>
          a Társaság az adatvédelmi incidenst követően olyan további intézkedéseket tett, amelyek biztosítják, hogy az
          érintett jogaira és szabadságaira jelentett, az (1) bekezdésben említett magas kockázat a továbbiakban
          valószínűsíthetően nem valósul meg;
        </p>
        <p>
          a tájékoztatás aránytalan erőfeszítést tenne szükségessé. Ilyen esetekben az érintetteket nyilvánosan
          közzétett információk útján kell tájékoztatni, vagy olyan hasonló intézkedést kell hozni, amely biztosítja az
          érintettek hasonlóan hatékony tájékoztatását. <br />
          Ha a Társaság még nem értesítette az érintettet az adatvédelmi incidensről, a felügyeleti hatóság, miután
          mérlegelte, hogy az adatvédelmi incidens valószínűsíthetően magas kockázattal jár-e, elrendelheti az érintett
          tájékoztatását, vagy megállapíthatja a (3) bekezdésben említett feltételek valamelyikének teljesülését.
        </p>
        <br />
        <h5>XI. A felügyeleti hatóságnál történő panasztételhez való jog</h5>
        <br />
        <p>
          Az egyéb közigazgatási vagy bírósági jogorvoslatok sérelme nélkül, minden érintett jogosult arra, hogy panaszt
          tegyen egy felügyeleti hatóságnál – különösen a szokásos tartózkodási helye, a munkahelye vagy a feltételezett
          jogsértés helye szerinti tagállamban –, ha az érintett megítélése szerint a rá vonatkozó személyes adatok
          kezelése megsérti e rendeletet. Az a felügyeleti hatóság, amelyhez a panaszt benyújtották, köteles
          tájékoztatni az ügyfelet a panasszal kapcsolatos eljárási fejleményekről és annak eredményéről, ideértve azt
          is, hogy az ügyfél jogosult bírósági jogorvoslattal élni.
        </p>
        <br />
        <h5>XII. Az adatkezelővel vagy az adatfeldolgozóval szembeni hatékony bírósági jogorvoslathoz való jog</h5>
        <br />
        <p>
          A rendelkezésre álló közigazgatási vagy nem bírósági útra tartozó jogorvoslatok – köztük a felügyeleti
          hatóságnál történő panasztételhez való jog – sérelme nélkül, minden érintett hatékony bírósági jogorvoslatra
          jogosult, ha megítélése szerint a személyes adatainak e rendeletnek nem megfelelő kezelése következtében
          megsértették az e rendelet szerinti jogait. Az adatkezelővel vagy az adatfeldolgozóval szembeni eljárást az
          adatkezelő vagy az adatfeldolgozó tevékenységi helye szerinti tagállam bírósága előtt kell megindítani. Az
          ilyen eljárás megindítható az érintett szokásos tartózkodási helye szerinti tagállam bírósága előtt is,
          kivéve, ha az adatkezelő vagy az adatfeldolgozó valamely tagállamnak a közhatalmi jogkörében eljáró közhatalmi
          szerve.
        </p>
        <br />
        <h5>XIII. Az érintettek képviselete</h5>
        <br />
        <p>
          Az érintett jogosult arra, hogy panaszának a nevében történő benyújtásával, jogainak a nevében való
          gyakorlásával, valamint – ha a tagállam joga ezt lehetővé teszi – a kártérítési jognak a nevében történő
          érvényesítésével olyan nonprofit jellegű szervet, szervezetet vagy egyesületet bízzon meg, amelyet valamely
          tagállam jogának megfelelően hoztak létre, és amelynek az alapszabályában rögzített céljai a közérdeket
          szolgálják, és amely az érintettek jogainak és szabadságainak a személyes adataik vonatkozásában biztosított
          védelme területén tevékenykedik. <br />A tagállamok rendelkezhetnek úgy, hogy az adott tagállamban az e cikk
          (1) bekezdésében említett bármely szerv, szervezet vagy egyesület – az érintettől kapott megbízástól
          függetlenül – jogosult legyen arra, hogy a felügyeleti hatósághoz panaszt nyújtson be, valamint hogy
          gyakorolja a fent említett jogokat, ha megítélése szerint az érintett személyes adatainak kezelése
          következtében megsértették az érintett e rendelet szerinti jogait.
        </p>
        <br />
        <h5>XIV. A kártérítéshez való jog és a felelősség</h5>
        <br />
        <p>
          Minden olyan személy, aki e rendelet megsértésének eredményeként vagyoni vagy nem vagyoni kárt szenvedett, az
          elszenvedett kárért az adatkezelőtől vagy az adatfeldolgozótól kártérítésre jogosult. Az adatkezelésben
          érintett valamennyi adatkezelő felelősséggel tartozik minden olyan kárért, amelyet az e rendeletet sértő
          adatkezelés okozott. Az adatfeldolgozó csak abban az esetben tartozik felelősséggel az adatkezelés által
          okozott károkért, ha nem tartotta be az e rendeletben meghatározott, kifejezetten az adatfeldolgozókat terhelő
          kötelezettségeket, vagy ha az adatkezelő jogszerű utasításait figyelmen kívül hagyta vagy azokkal ellentétesen
          járt el. Az adatkezelő, illetve az adatfeldolgozó mentesül az e cikk (2) bekezdése szerinti felelősség alól,
          ha bizonyítja, hogy a kárt előidéző eseményért őt semmilyen módon nem terheli felelősség. Ha több adatkezelő
          vagy több adatfeldolgozó vagy mind az adatkezelő mind az adatfeldolgozó érintett ugyanabban az adatkezelésben,
          és – a (2) és (3) bekezdés alapján – felelősséggel tartozik az adatkezelés által okozott károkért, minden
          egyes adatkezelő vagy adatfeldolgozó az érintett tényleges kártérítésének biztosítása érdekében egyetemleges
          felelősséggel tartozik a teljes kárért. Ha valamely adatkezelő vagy adatfeldolgozó a (4) bekezdéssel
          összhangban teljes kártérítést fizetett az elszenvedett kárért, jogosult arra, hogy az ugyanazon
          adatkezelésben érintett többi adatkezelőtől vagy adatfeldolgozótól visszaigényelje a kártérítésnek azt a
          részét, amely megfelel a (2) bekezdésben megállapított feltételek értelmében a károkozásért viselt
          felelősségük mértékének. A kártérítéshez való jog érvényesítését célzó bírósági eljárást az előtt a bíróság
          előtt kell megindítani, amely a XI. cikk (2) bekezdésében említett tagállam joga szerint illetékes.
        </p>
        <br />
        <br />
        <p>Az adatkezelési tájékoztató letölthető az alábbi linkre kattintva:</p>
        <br />
        <a
          className="bix-green"
          href="https://cdn.bixindex.hu/docs/bix-adatkezelesi-nyilatkozat.pdf"
          target="_blank"
          rel="noreferrer"
          download=""
        >
          Letöltés
        </a>
        <br />
        <br />
        <p>Budapest, 2018. augusztus 31.</p>
      </div>
      <div className={classes.mt150}>
        <Footer logoPath={logo}></Footer>
      </div>
      <meta name="description" content="Próbáld ki, hogy van-e jogosultságod a BIX-re!" />
      <meta property="og:title" content="Jogosultság - BIX - Cégek, akikkel nyugodtan dolgozhatsz" />
      <meta property="og:description" content="Próbáld ki, hogy van-e jogosultságod a BIX-re!" />
    </>
  );
};
