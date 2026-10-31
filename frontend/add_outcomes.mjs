import fs from 'fs';
let s = fs.readFileSync('src/pages/AlumniPage.module.css', 'utf8');
const target = `  .statsKpisVertical {
    grid-template-columns: 1fr;
  }

  .chartCardLarge {`;
const replacement = `  .statsKpisVertical {
    grid-template-columns: 1fr;
  }

  .outcomesLayout {
    grid-template-columns: 1fr;
  }

  .chartCardLarge {`;
if (s.includes(target) && !s.includes('.outcomesLayout {\n    grid-template-columns: 1fr;\n  }') && s.indexOf(target) > 1500) {
  s = s.replace(target, replacement);
  fs.writeFileSync('src/pages/AlumniPage.module.css', s);
  console.log('done');
} else {
  console.log('skip');
}
