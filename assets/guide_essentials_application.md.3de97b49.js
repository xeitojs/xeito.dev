import{_ as s,c as a,o as n,V as o}from"./chunks/framework.e9ed5590.js";const C=JSON.parse('{"title":"Creating a Xeito Application","description":"","frontmatter":{},"headers":[],"relativePath":"guide/essentials/application.md","filePath":"guide/essentials/application.md"}'),e={name:"guide/essentials/application.md"},t=o(`<h1 id="creating-a-xeito-application" tabindex="-1">Creating a Xeito Application <a class="header-anchor" href="#creating-a-xeito-application" aria-label="Permalink to &quot;Creating a Xeito Application&quot;">​</a></h1><h2 id="the-application-instance" tabindex="-1">The application instance <a class="header-anchor" href="#the-application-instance" aria-label="Permalink to &quot;The application instance&quot;">​</a></h2><p>A Xeito application starts by creating a new instance of <code>Xeito</code>:</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Xeito</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@xeito/core</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Xeito</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span></code></pre></div><h2 id="the-root-component" tabindex="-1">The root Component <a class="header-anchor" href="#the-root-component" aria-label="Permalink to &quot;The root Component&quot;">​</a></h2><p>The <code>Xeito()</code> consctructor requires a single argument, the root component of your application. Every app requires a root component, which is the first component to be rendered when the application starts and will contain other components as children.</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Xeito</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@xeito/core</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">AppComponent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./app.component</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> app </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">new</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">Xeito</span><span style="color:#A6ACCD;">(AppComponent)</span><span style="color:#89DDFF;">;</span></span></code></pre></div><p>Many of the examples in this guide only use a single component, but in a real application you will have many components, each one with its own responsibilities. These components will be organized in a tree-like structure, with the root component at the top and other components as children. An example component structure of an application might look like this:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">AppComponent (root component)</span></span>
<span class="line"><span style="color:#A6ACCD;">├─ LoginPage</span></span>
<span class="line"><span style="color:#A6ACCD;">│  └─ LoginForm</span></span>
<span class="line"><span style="color:#A6ACCD;">│  │   ├─ UsernameInput</span></span>
<span class="line"><span style="color:#A6ACCD;">│  │   └─ PasswordInput</span></span>
<span class="line"><span style="color:#A6ACCD;">│  └─ LoginButton</span></span>
<span class="line"><span style="color:#A6ACCD;">└─ Dashboard</span></span>
<span class="line"><span style="color:#A6ACCD;">   ├─ UserProfile</span></span>
<span class="line"><span style="color:#A6ACCD;">   └─ UserMessages</span></span></code></pre></div><p>Later we will see how to compose multiple components together to build a complex UI and how to use the Xeito router to navigate between different views, but for now we will start with a simple component and what happens inside of it.</p><h2 id="bootstrapping-the-application" tabindex="-1">Bootstrapping the application <a class="header-anchor" href="#bootstrapping-the-application" aria-label="Permalink to &quot;Bootstrapping the application&quot;">​</a></h2><p>The <code>Xeito()</code> constructor will create a new instance of the application, but it won&#39;t start it or render anything on the screen until the <code>.bootstrap()</code> method is called. It expects a single argument, which can be either a DOM element or a CSS selector string.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">root</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">app</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">bootstrap</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">#root</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;">// or app.bootstrap(document.getElementById(&#39;app&#39;));</span></span></code></pre></div><p>The content of the root component will be rendered inside of the DOM element that was passed to the <code>.bootstrap()</code> method.</p><p>The <code>.bootstrap()</code> method should always be called after all the app configuration is done, like registering plugins (more on this later).</p>`,16),p=[t];function l(c,i,r,D,y,h){return n(),a("div",null,p)}const F=s(e,[["render",l]]);export{C as __pageData,F as default};
