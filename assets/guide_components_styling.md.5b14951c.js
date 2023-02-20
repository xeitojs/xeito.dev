import{_ as s,c as n,o as a,a as o}from"./app.407d845c.js";const h=JSON.parse(`{"title":"Styling Components","description":"","frontmatter":{},"headers":[{"level":2,"title":"Styling Components with Regular CSS/SCSS","slug":"styling-components-with-regular-css-scss","link":"#styling-components-with-regular-css-scss","children":[]},{"level":2,"title":"Styling Components with Shadow DOM","slug":"styling-components-with-shadow-dom","link":"#styling-components-with-shadow-dom","children":[{"level":3,"title":"Using a style tag inside the component's template","slug":"using-a-style-tag-inside-the-component-s-template","link":"#using-a-style-tag-inside-the-component-s-template","children":[]},{"level":3,"title":"Using constructable stylesheets","slug":"using-constructable-stylesheets","link":"#using-constructable-stylesheets","children":[]}]}],"relativePath":"guide/components/styling.md"}`),l={name:"guide/components/styling.md"},e=o(`<h1 id="styling-components" tabindex="-1">Styling Components <a class="header-anchor" href="#styling-components" aria-hidden="true">#</a></h1><p>Xeito is built on top of the <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" target="_blank" rel="noreferrer">Web Components</a> standard, which allows you to create custom HTML elements that encapsulate your own functionality on an HTML page. This is a powerful feature that allows you to build reusable components that can be used to create rich, interactive web applications. However, styling web components is still a bit tricky, since the only way to scope your styles is to use Shadow DOM, which can introduce some undesired side effects, like isolating your styles from the rest of the page completely (which can be useful in some cases, but not in others) or having to use a special syntax to style your components.</p><p>By default, Xeito components don&#39;t use Shadow DOM, which means that you can style them with your regular CSS/SCSS files. However, if you want to use Shadow DOM, you can do so by adding the <code>shadow: true</code> option to your component&#39;s decorator (be aware that this will isolate this component&#39;s styles from the rest of the page).</p><h2 id="styling-components-with-regular-css-scss" tabindex="-1">Styling Components with Regular CSS/SCSS <a class="header-anchor" href="#styling-components-with-regular-css-scss" aria-hidden="true">#</a></h2><p>This is the default behavior of Xeito, and it&#39;s the most straightforward way to style your components. Xeito relies on your bundler to handle the scoping of your styles, so you can use any CSS preprocessor you want (as long as it&#39;s supported by your bundler) and import your CSS files into your components.</p><p>Since your components behave like regular HTML elements, you can use any CSS library or framework you want to style them such as <a href="https://getbootstrap.com/" target="_blank" rel="noreferrer">Bootstrap</a> or <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">Tailwind</a>.</p><p>If you created your project with the Xeito CLI, it will be automatically configured with <a href="https://parceljs.org/" target="_blank" rel="noreferrer">Parcel</a> to allow you to import CSS/SCSS files into your components. If you&#39;re using a different bundler, you&#39;ll need to configure it to allow you to import CSS files. Parcel also supports <a href="https://parceljs.org/languages/css/#css-modules" target="_blank" rel="noreferrer">CSS modules</a>, which are a great way to avoid class name collisions, so we&#39;ll use them to style our component.</p><p>Let&#39;s create a component and style it with a CSS file called <code>my-component.module.css</code>.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Component</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">XeitoComponent</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">html</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@xeito/core</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> classes </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./my-component.module.css</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">selector</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">my-component</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">shadow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// This is the default value, so you don&#39;t need to specify it</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyComponent</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">XeitoComponent</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">html</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">      &lt;button class=</span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">classes</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">button</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">&gt;Click me!&lt;/button&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>As you can see, we&#39;re using an interpolated expression to add the CSS class to the button. This is because we&#39;re using CSS modules, which will generate a unique class name for each CSS class. We can&#39;t use the class name directly, because it will change every time we build our project.</p><p>If you&#39;re not using CSS modules (or you&#39;re using a tool like Tailwind), you can just use the class name directly.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Component</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">XeitoComponent</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">html</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@xeito/core</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./my-component.css</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">selector</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">my-component</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyComponent</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">XeitoComponent</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">html</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">      &lt;button class=&quot;button&quot;&gt;Click me!&lt;/button&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="styling-components-with-shadow-dom" tabindex="-1">Styling Components with Shadow DOM <a class="header-anchor" href="#styling-components-with-shadow-dom" aria-hidden="true">#</a></h2><p>When you create a component with Shadow DOM, the component&#39;s styles are isolated from the rest of the page. This means that you can use generic class names, such as <code>.button</code>, without worrying about them conflicting with the rest of the page. Styling web components with Shadow DOM is a rather tricky endeavor, because you need to take into account the Shadow DOM&#39;s <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM#Encapsulation" target="_blank" rel="noreferrer">encapsulation</a>. This means that you can&#39;t just use a CSS selector from a css file to style a component&#39;s internal elements.</p><p>There are some ways around it, you can either place a style tag inside your component&#39;s template, make use of constructable stylesheets, or use a CSS-in-TS library such as <a href="https://vanilla-extract.style/" target="_blank" rel="noreferrer">Vanilla Extract</a>.</p><h3 id="using-a-style-tag-inside-the-component-s-template" tabindex="-1">Using a style tag inside the component&#39;s template <a class="header-anchor" href="#using-a-style-tag-inside-the-component-s-template" aria-hidden="true">#</a></h3><p>This is the simplest way to style a component with Shadow DOM. You can just place a style tag inside your component&#39;s template and use regular CSS selectors to style your component&#39;s internal elements.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Component</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">XeitoComponent</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">html</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@xeito/core</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">selector</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">my-component</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">shadow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyComponent</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">XeitoComponent</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">html</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">      &lt;style&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">        button {</span></span>
<span class="line"><span style="color:#C3E88D;">          background-color: blue;</span></span>
<span class="line"><span style="color:#C3E88D;">          color: white;</span></span>
<span class="line"><span style="color:#C3E88D;">          padding: 10px 20px;</span></span>
<span class="line"><span style="color:#C3E88D;">          border-radius: 5px;</span></span>
<span class="line"><span style="color:#C3E88D;">          border: none;</span></span>
<span class="line"><span style="color:#C3E88D;">          cursor: pointer;</span></span>
<span class="line"><span style="color:#C3E88D;">        }</span></span>
<span class="line"><span style="color:#C3E88D;">      &lt;/style&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">      &lt;button&gt;Click me!&lt;/button&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h3 id="using-constructable-stylesheets" tabindex="-1">Using constructable stylesheets <a class="header-anchor" href="#using-constructable-stylesheets" aria-hidden="true">#</a></h3><p>Constructable stylesheets are a new feature that allows you to create stylesheets in JavaScript and attach them to the DOM. This is a great way to style your components with Shadow DOM, since you can use regular CSS selectors to style your component&#39;s internal elements.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Component</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">XeitoComponent</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">html</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@xeito/core</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">selector</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">my-component</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">shadow</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyComponent</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">extends</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">XeitoComponent</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">super</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">style</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">CSSStyleSheet</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">style</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">replaceSync</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">      button {</span></span>
<span class="line"><span style="color:#C3E88D;">        background-color: blue;</span></span>
<span class="line"><span style="color:#C3E88D;">        color: white;</span></span>
<span class="line"><span style="color:#C3E88D;">        padding: 10px 20px;</span></span>
<span class="line"><span style="color:#C3E88D;">        border-radius: 5px;</span></span>
<span class="line"><span style="color:#C3E88D;">        border: none;</span></span>
<span class="line"><span style="color:#C3E88D;">        cursor: pointer;</span></span>
<span class="line"><span style="color:#C3E88D;">      }</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">shadowRoot</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">adoptedStyleSheets</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> [</span><span style="color:#A6ACCD;">style</span><span style="color:#F07178;">]</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">render</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">html</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">      &lt;button&gt;Click me!&lt;/button&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">    </span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>Note how we&#39;re accessing the component&#39;s shadow root and attaching the stylesheet to it.</p>`,22),p=[e];function t(c,r,y,i,D,F){return a(),n("div",null,p)}const A=s(l,[["render",t]]);export{h as __pageData,A as default};
