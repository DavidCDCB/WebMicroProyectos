module.exports = {
    vert: [
        '// Untextured Plasma Shader',

        'attribute vec2 a_position;',
        'void main(void) {',
        '   gl_Position = vec4(a_position, 0.0, 1.0);',
        '}'
    ].join('\n'),
    frag: [
        '// Untextured Plasma Shader',
        
        'precision mediump float;',
        'uniform float time;',
        '// Oldskool plasma shader. (c) Victor Korsun, bitekas@gmail.com; 1996-2013.',
        '//',
        '// Attribution-ShareAlike CC License.',
        '//----------------',
        'const int ps = 2; // use values > 1..10 for oldskool',
        'const vec2 resolution = vec2(1280.0, 720.0);',
        '//----------------',
        'void main(void) {',
        '   float x = gl_FragCoord.x / resolution.x * 1280.0;',
        '   float y = gl_FragCoord.y / resolution.y * 720.0;',
        '   if (ps > 0)',
        '   {',
        '       x = float(int(x / float(ps)) * ps);',
        '       y = float(int(y / float(ps)) * ps);',
        '   }',
        '   float mov0 = x+y+sin(time)*10.+sin(x/90.)*70.+time*2.;',
        '   float mov1 = (mov0 / 5. + sin(mov0 / 30.))/ 10. + time * 3.;',
        '   float mov2 = mov1 + sin(mov1)*5. + time*1.0;',
        '   float cl1 = sin(sin(mov1/4. + time)+mov1);',
        '   float c1 = cl1 +mov2/2.-mov1-mov2+time;',
        '   float c2 = sin(c1+sin(mov0/100.+time)+sin(y/57.+time/50.)+sin((x+y)/200.)*2.);',
        '   float c3 = abs(sin(c2+cos((mov1+mov2+c2) / 10.)+cos((mov2) / 10.)+sin(x/80.)));',
        '   float dc = float(16-ps);',
        '   if (ps > 0)',
        '   {',
        '      cl1 = float(int(cl1*dc))/dc;',
        '      c2 = float(int(c2*dc))/dc;',
        '      c3 = float(int(c3*dc))/dc;',
        '   }',
        '   gl_FragColor = vec4(cl1, c2, c3, 1.0);',
        '}'
    ].join('\n')
};
