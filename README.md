<div align="center">

# 🚇 Cairo Metro Smart Guide
**دليل مترو القاهرة الذكي — أسرع، أذكى، وبدون إنترنت.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![PWA](https://img.shields.io/badge/PWA_Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[Live Demo (رابط التطبيق)](#) • [Report Bug (الإبلاغ عن مشكلة)](https://github.com/seif4d/Metro/issues) • [Request Feature (طلب ميزة)](https://github.com/seif4d/Metro/issues)

<img src="https://via.placeholder.com/800x400/060913/3b82f6?text=Metro+App+Screenshot+Here" alt="Metro App UI Preview" style="border-radius: 12px; margin-top: 20px;">

</div>

---

## ⚡ TL;DR (الخلاصة)
تطبيق ويب تقدمي (PWA) خفيف جداً ومبني بالكامل بـ **Vanilla Web Tech** (بدون فريم وورك). بيحسبلك أفضل مسار، الوقت، التكلفة، وعدد المحطات جوا شبكة النقل في القاهرة (المترو، المونوريل، والقطار الخفيف LRT). الأهم؟ **بيشتغل Offline تماماً** عشان لو مفيش شبكة تحت الأرض. 🚇🚫📶

---

## 🔥 ليه التطبيق ده مختلف؟ (Features)

* 🌍 **Seamless Coverage:** تغطية كاملة لـ (الخط 1، 2، 3 + فروعهم)، مونوريل شرق النيل، وـ LRT.
* 🧠 **Smart Routing (Modified Dijkstra):** الخوارزمية مش بس بتجيب أقصر طريق، دي بتدّي "عقوبة" (Transfer Penalty) للتبديلات عشان متمرمطكش بين الخطوط لو فيه طريق أسهل.
* 🔍 **Fuzzy Arabic Search:** بتكتب "التحرير"؟ هيوديك "السادات". بتكتب من غير همزات أو تشكيل؟ برضه هيفهمك.
* 💸 **Auto-Pricing Engine:** بيحسبلك التكلفة الإجمالية تلقائياً بناءً على عدد المحطات وشرائح الأسعار المحدثة (حتى منتصف 2026).
* 📱 **Native-like Vibe:** تصميم زجاجي (Glassmorphism)، أنيميشن سلس، ودعم كامل للـ Dark Mode. 
* 💾 **Zero-Data State:** شغال PWA وبيكيّش (Cache) كل حاجة محلياً.. افتحه تحت الأرض براحتك.

---

## 🤓 Nerd Out: The Routing Algorithm

عشان نضمن تجربة مستخدم مريحة، عدّلنا خوارزمية **Dijkstra** عشان تفهم إن "التبديل بين الخطوط متعب". 
التكلفة مش بتتحسب بعدد المحطات بس، لكن أي تغيير لخط تاني بياخد `Penalty Weight` إضافي:

```javascript
// 💡 The Magic Sauce: Interchange Penalty
if (currentInfo.lastLine && currentInfo.lastLine !== edgeLine) {
    stepCost += 12; // We punish unnecessary line switching!
}
```

---

## 🚀 Quick Start (شغّله عندك)

التطبيق `Zero-Dependencies`، يعني مفيش `npm install` ولا وجع دماغ.

```bash
# 1. Clone the repo
git clone https://github.com/seif4d/Metro.git

# 2. Go to the project directory
cd Metro

# 3. Open it up (using Live Server, Python, or just double click index.html)
npx serve . 
# أو لو عندك بايثون:
# python -m http.server 8000
```
> 🌐 افتح `http://localhost:8000` وعيش!

---

## 📂 Project Structure

هيكل احترافي وبسيط، مصمم عشان يكون خفيف على المتصفح:

```text
📦 Metro
 ┣ 📜 index.html         # The Brain & The Beauty (UI + Logic)
 ┣ 📜 manifest.json      # PWA Identity & Installation rules
 ┣ 📜 sw.js              # Service Worker (The Offline Hero)
 ┣ 🖼️ favicon-32.png     # Web Icon
 ┗ 🖼️ apple-touch-icon.png # iOS Homescreen Icon
```

---

## 🎟️ أسعار التذاكر المُدمجة (اضغط للتفاصيل)

<details>
<summary><b>🚇 المترو (الخطوط 1، 2، 3)</b></summary>
<br>
- حتى 9 محطات: 10 ج.م <br>
- من 10 لـ 16 محطة: 12 ج.م <br>
- من 17 لـ 23 محطة: 15 ج.م <br>
- أكثر من 23 محطة: 20 ج.م
</details>

<details>
<summary><b>🚝 مونوريل شرق النيل</b></summary>
<br>
- حتى 5 محطات: 20 ج.م <br>
- حتى 10 محطات: 40 ج.م <br>
- حتى 15 محطة: 55 ج.م <br>
- أكثر من 15 محطة: 80 ج.م
</details>

<details>
<summary><b>🚈 القطار الكهربائي الخفيف (LRT)</b></summary>
<br>
- حتى 3 محطات: 10 ج.م <br>
- حتى 7 محطات: 15 ج.م <br>
- أكثر من 7 محطات: 20 ج.م
</details>

---

## 🤝 Let's Build Together (المساهمة)

حابب تضيف الخط الرابع؟ تحسّن الـ UI؟ أو تظبط الـ Codebase؟
الـ PRs مفتوحة للجميع!

1. اعمل **Fork** للمشروع.
2. اعمل **Branch** باسم التعديل بتاعك (`git checkout -b feature/CoolNewThing`).
3. اعمل **Commit** لتعديلاتك (`git commit -m 'Added some magic'`).
4. اعمل **Push** (`git push origin feature/CoolNewThing`).
5. افتح **Pull Request** 🚀.

---

## 📜 License & Disclaimer

- **الرخصة:** [MIT License](./LICENSE) - عيش براحتك، عدل، واستخدم الكود.
- **تنويه:** هذا التطبيق مبني على البيانات الرسمية حتى *منتصف 2026*. الأسعار والمواعيد قد تتغير، لذا يُرجى مراجعة اللوحات الرسمية داخل المحطات للتأكيد.

<div align="center">
  <br>
  <b>Built with 💻 and ☕ by <a href="https://github.com/seif4d">Seif4D</a></b>
</div>
