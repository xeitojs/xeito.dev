import{_ as s,c as n,o as a,a as o}from"./app.7afe8c02.js";const A=JSON.parse(`{"title":"Actions","description":"","frontmatter":{},"headers":[{"level":2,"title":"Creating an action","slug":"creating-an-action","link":"#creating-an-action","children":[]},{"level":2,"title":"Using the action","slug":"using-the-action","link":"#using-the-action","children":[{"level":3,"title":"Passing parameters to the action","slug":"passing-parameters-to-the-action","link":"#passing-parameters-to-the-action","children":[]}]},{"level":2,"title":"Modify the action's element","slug":"modify-the-action-s-element","link":"#modify-the-action-s-element","children":[]}],"relativePath":"reusability/actions.md"}`),l={name:"reusability/actions.md"},e=o(`<h1 id="actions" tabindex="-1">Actions <a class="header-anchor" href="#actions" aria-hidden="true">#</a></h1><p>Actions provide a way to encapsulate DOM manipulation and event handling in a reusable way. They can be imported by a component directly or provided by a Plugin globally.</p><h2 id="creating-an-action" tabindex="-1">Creating an action <a class="header-anchor" href="#creating-an-action" aria-hidden="true">#</a></h2><p>To create an action we&#39;ll use the <code>@Action()</code> decorator. This decorator will mark the class as an action and allow us to import it into a component later.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Action</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@xeito/core</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Action</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">selector</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">myAction</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyAction</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// ...</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>The <code>@Action()</code> decorator accepts an object with a single property called <code>selector</code>. This property is used to identify the action in the component, so it must be unique to prevent conflicts.</p><h2 id="using-the-action" tabindex="-1">Using the action <a class="header-anchor" href="#using-the-action" aria-hidden="true">#</a></h2><p>To be able to use the action in a component, we must add it to the component&#39;s <code>actions</code> property.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Component</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">XeitoComponent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@xeito/core</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">MyAction</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./my-action</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Component</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">selector</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">my-component</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">actions</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> [MyAction]</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span></code></pre></div><p>We can them use the action in the component&#39;s template by using the <code>.use()</code> method:</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">render</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">html</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">    &lt;div class=&quot;component-container&quot;&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">      </span><span style="color:#89DDFF;">\${</span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">myAction</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C3E88D;">      Component text</span></span>
<span class="line"><span style="color:#C3E88D;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">  </span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>Action calls should be placed inside an interpolation (one for each action call) that is inside the element we want to use the action on. The recommended way to do this is to place them as the first children of the element.</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">component-container</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  \${this.use(&#39;myAction&#39;)}</span></span>
<span class="line"><span style="color:#A6ACCD;">  \${this.use(&#39;myOtherAction&#39;)}</span></span>
<span class="line"><span style="color:#A6ACCD;">  \${this.use(&#39;myThirdAction&#39;)}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  Component text</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h3 id="passing-parameters-to-the-action" tabindex="-1">Passing parameters to the action <a class="header-anchor" href="#passing-parameters-to-the-action" aria-hidden="true">#</a></h3><p>The <code>use()</code> method allows us to also pass parameters to the action, which can be used to customize the action&#39;s behavior.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#82AAFF;">render</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">html</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">    &lt;div class=&quot;component-container&quot;&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">      </span><span style="color:#89DDFF;">\${</span><span style="color:#89DDFF;">this.</span><span style="color:#82AAFF;">use</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">myAction</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">param1</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">value1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">param2</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">value2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C3E88D;">      Component text</span></span>
<span class="line"><span style="color:#C3E88D;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">  </span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><em><strong>Note</strong>: We&#39;re not limited to a single parameter, we can pass as many as we want (as long as the action&#39;s constructor accepts them).</em></p><h2 id="modify-the-action-s-element" tabindex="-1">Modify the action&#39;s element <a class="header-anchor" href="#modify-the-action-s-element" aria-hidden="true">#</a></h2><p>So far we&#39;ve seen how to create a new action and how to use it in a component but we haven&#39;t seen how to modify the element that the action is being used on. To access the element and parameters passed to the action, we have to use the constructor of the action class, since a new instance of the action is created on every render.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Action</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@xeito/core</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Action</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">selector</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">myAction</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">class</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">MyAction</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#C792EA;">constructor</span><span style="color:#89DDFF;">(</span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">element</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">HTMLElement</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">private</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">params</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">any</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#676E95;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * The element parameter is the element that the action is being used on </span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * (the parent of the interpolation)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     * We can modify it however we want using the DOM API</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">     */</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">element</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">classList</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">my-action</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">element</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">style</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">color</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">params</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">color</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p><em><strong>Note</strong>: The <code>params</code> parameter is optional, so we can omit it if we don&#39;t need it.</em></p><p>And that&#39;s it. We&#39;ve created an action and used it in a component. Remeber that action instances are created on every render, so <strong>we can&#39;t use them to store state</strong>.</p>`,22),p=[e];function t(c,r,i,y,D,F){return a(),n("div",null,p)}const d=s(l,[["render",t]]);export{A as __pageData,d as default};