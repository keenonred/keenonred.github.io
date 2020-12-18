<!DOCTYPE html>
<html>
<title>Clickity Click Tech Skill Task</title>
<meta author="Donatas Uznys @ Zenitech" />
<meta copyright="Zenitech" />
<meta charset="utf-8" />

<head>
  <style>
    body {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    .main {
      width: 750px;
      margin: 0 auto;
    }

    h1 {
      color: #ff1b3a;
    }

    p {
      margin-top: 30px;
    }

    .row {
      margin-left: 10%;
    }

    .icon {
      float: left;
      width: 43px;
      height: 48px;
      border: 1px solid #CEDCEA;
      padding: 10px;
      color: rgb(199, 199, 199);
    }

    [active] {
      color: #ff1b3a;
    }
  </style>

  <script>
    const rowDiv = `<div class="row"></div>`;
    const iconDiv = `<div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="159.271" height="50" viewBox="0 0 159.271 43.739"
          fill="currentColor">
          <title>Zenitech logo</title>
          <path
            d="M22.677 43.738a5.114 5.114 0 0 1-2.015-.408L5.186 36.794a5.2 5.2 0 0 1-3.129-4.152L.036 15.968a5.188 5.188 0 0 1 2.028-4.761L15.551 1.043A5.259 5.259 0 0 1 18.673 0a5.116 5.116 0 0 1 2.015.408l15.476 6.536a5.2 5.2 0 0 1 3.129 4.152l2.014 16.674a5.188 5.188 0 0 1-2.028 4.761L25.792 42.695a5.239 5.239 0 0 1-3.115 1.043zM19.432 20.23a.407.407 0 0 0-.175.039L8.983 24.596a.445.445 0 0 0-.272.415l.007 1.736-.007 1.529a.853.853 0 0 0 .525.8l9.425 4.029a.759.759 0 0 0 .317.071.874.874 0 0 0 .881-.862v-.02l.006-2.539a.455.455 0 0 0-.272-.415l-6.089-2.559 5.817-2.416a.9.9 0 0 0 .564-.8l-.007-2.889a.448.448 0 0 0-.447-.447zm2.928-9.807a.874.874 0 0 0-.881.862v.019l-.007 2.539a.455.455 0 0 0 .272.415l6.089 2.559-5.817 2.416a.9.9 0 0 0-.564.8l.007 2.889a.449.449 0 0 0 .453.447.43.43 0 0 0 .175-.039l10.274-4.334a.445.445 0 0 0 .272-.415l-.006-1.736.006-1.529a.854.854 0 0 0-.525-.8l-9.432-4.023a.67.67 0 0 0-.317-.071z">
          </path>
        </svg>
      </div>`;
    const endDiv = `<div style="clear:both;"></div>`;

    const initExample = () => {
      document.querySelector(".example").innerHTML = rowDiv + rowDiv + rowDiv;
      document.querySelectorAll(".example .row").forEach(el => el.innerHTML = iconDiv + iconDiv + iconDiv + endDiv);
      document.querySelectorAll(".example .row .icon").forEach((el, i) => { if (i !== 4) el.setAttribute("active", "true") })
    };

    const w = () => {
      const queryMatchForWidth = window.location.href.match(/(?:[?&]width=)([3-9])/);
      return queryMatchForWidth ? queryMatchForWidth[1] : 4;
    }

    const h = () => {
      const queryMatchForHeight = window.location.href.match(/(?:[?&]height=)([3-9])/);
      return queryMatchForHeight ? queryMatchForHeight[1] : 4;
    }

    const prepareMainGrid = () => {
      const mainGrid = document.querySelector(".mainGrid");
      for (i = 0; i < h(); i++) mainGrid.innerHTML += rowDiv;
      document.querySelectorAll(".mainGrid .row").forEach(row => {
        for (i = 0; i < w(); i++) row.innerHTML += iconDiv;
        row.innerHTML += endDiv;
      });
      document.querySelectorAll(".mainGrid .row .icon")
        .forEach(icon => icon.setAttribute("onclick", "activateCell(this)"));
    }

    const init = () => {
      initExample();
      prepareMainGrid();
      document.querySelector(".easyMode").checked = false; // disable this to introduce a bug :P
    };

    const activateCell = el => {
      if (!el.getAttribute("active"))
        el.setAttribute("active", "true")
      else el.removeAttribute("active");
      if (Array.from(document.querySelectorAll(".mainGrid .row .icon")).every((el,i)=>((i<w()||i%w()===0||i%w()===w()-1||i>w()*(h()-1))&&el.getAttribute("active"))||(!(i<w()||i%w()===0||i%w()===w()-1||i>w()*(h()-1))&&!el.getAttribute("active")))) {const s=parseInt(prompt("Done! Ready for the next try? Give me a size [3-9]:",5));if(s<3||s>9)alert('Not a good size!');window.location.href=window.location.href.split('?')[0]+`?width=${s}&height=${s}`}
    };

    const enableEasyMode = el => {
      const icons = document.querySelectorAll(".mainGrid .row .icon");
      if (el.checked)
        icons.forEach((icon, i) => icon.setAttribute("id", `${Math.ceil((i + 1) / w())}${i % w() + 1}`));
      else icons.forEach(icon => icon.removeAttribute("id"));
    }
  </script>
</head>

<body onload="init()">

  <div class="main">

    <h1>Your playground</h1>

    <!-- Control the size of the grid by adding query parameters: ?width=6&height=5 -->

    <div class="mainGrid"></div>


    <h2>Task</h2>
    <p>1. Define test cases for the application under test according to the requirements.</p>
    <p>2. Report defects (bugs) if you find any.</p>
	<p>3. What else would you test? Please define additional tests.</p>
	<p>4. What tests would you automate? Automate tests using any test automation tool.</p>

    <h2>Requirements of the application under test</h2>
    <p>1. After the user clicks all icons in the outer perimeter, the dialog should appear.</p>
    <p>The result might look like this depending on the size of the grid:</p>
    <div class="example"></div>
    <p>None of the cells on the inside should be clicked like in this example.</p>

    <p>2. In the dialog the user should be able to define size of the grid.</p>
	<p>3. After the user defines the size of the grid, the grid should have appropriate number of columns and rows.</p>

    <h2>References that may help</h2>
    <p>Software Testing fundamentals: <a href=https://www.istqb.org/downloads/send/2-foundation-level-documents/281-istqb-ctfl-syllabus-2018-v3-1.html>ISTQB Foundation Level Syllabus</a></p>
    <p>Test cases: <a href=https://www.guru99.com/test-case.html>How to Write Test Cases: Sample Template with Examples</a></p>
    <p>Test cases: <a href=https://www.softwaretestinghelp.com/how-to-write-effective-test-cases-test-cases-procedures-and-definitions>How to Write Test Cases: The Ultimate Guide with Examples</a></p>
	<p>Test automation: <a href=https://testautomationu.applitools.com>Test Automation University</a></p>


  </div>
</body>

</html>
