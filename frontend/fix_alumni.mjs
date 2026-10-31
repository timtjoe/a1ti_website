import fs from 'fs';
let s = fs.readFileSync('src/pages/AlumniPage.jsx', 'utf8');
s = s.replace("imageAlt={`Illustrative sample portrait of ${person.name}`}", "imageAlt={person.imageAlt || `Portrait of ${person.name}`}");
s = s.replace('qualification={person.course}', 'qualification={person.areaOfStudy || person.course}');
s = s.replace('Sample: {person.certificate}', '{person.certificate}{person.yearGraduated ? ` · ${person.yearGraduated}` : \'\'}');
fs.writeFileSync('src/pages/AlumniPage.jsx', s);
console.log('done');
