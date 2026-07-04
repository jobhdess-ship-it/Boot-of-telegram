const fs = require('fs');
let code = fs.readFileSync('src/views/LoginView.tsx', 'utf8');

code = code.replace(
  '<div className="relative z-10 w-full max-w-xs mx-auto flex flex-col">',
  '<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-xs mx-auto flex flex-col">'
);

fs.writeFileSync('src/views/LoginView.tsx', code);
