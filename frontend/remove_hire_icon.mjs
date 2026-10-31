import fs from 'fs';
let s = fs.readFileSync('src/pages/AlumniPage.jsx', 'utf8');
s = s.replace('Hire now\n                          <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>\n                        </button>', 'Hire now\n                        </button>');
fs.writeFileSync('src/pages/AlumniPage.jsx', s);
console.log('done');
