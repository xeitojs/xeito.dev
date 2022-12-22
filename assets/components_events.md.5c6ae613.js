import{_ as s,c as e,o as n,a}from"./app.d6637636.js";const h=JSON.parse('{"title":"Events","description":"","frontmatter":{},"headers":[{"level":2,"title":"Overview","slug":"overview","link":"#overview","children":[]},{"level":2,"title":"The @Event() decorator","slug":"the-event-decorator","link":"#the-event-decorator","children":[]},{"level":2,"title":"Listening to events","slug":"listening-to-events","link":"#listening-to-events","children":[]},{"level":2,"title":"Event configuration","slug":"event-configuration","link":"#event-configuration","children":[]}],"relativePath":"components/events.md"}'),o={name:"components/events.md"},t=a(`<h1 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-hidden="true">#</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-hidden="true">#</a></h2><p>Events are the most basic way to communicate between components. Child components can emit events that bubble up and can then be handled by the parent component. Xeito relies on the native <a href="https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent" target="_blank" rel="noreferrer">CustomEvent</a> API to handle events.</p><h2 id="the-event-decorator" tabindex="-1">The <code>@Event()</code> decorator <a class="header-anchor" href="#the-event-decorator" aria-hidden="true">#</a></h2><p>To be able to emit events from a component, we need to create a new property decorated with the <code>@Event()</code> decorator. The name of the decorated class property will be the name of the event that&#39;s being emitted (this can be changed by passing an EventConfig object to the decorator, as we&#39;ll see later).</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre><code><span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Event</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">EventEmitter</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@xeito/core</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Event</span><span style="color:#A6ACCD;">() </span><span style="color:#FFCB6B;">myEvent</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> EventEmitter</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>As you can see, the <code>@Event()</code> decorator returns an <code>EventEmitter</code> object. This object can be used to emit events from the component.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre><code><span class="line"><span style="color:#676E95;">// my-component.ts</span></span>
<span class="line"><span style="color:#89DDFF;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">Event</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">EventEmitter</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@xeito/core</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Event</span><span style="color:#A6ACCD;">() </span><span style="color:#FFCB6B;">myEvent</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> EventEmitter</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">notifyParent</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">myEvent</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">emit</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello World!</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// Emits an event</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="listening-to-events" tabindex="-1">Listening to events <a class="header-anchor" href="#listening-to-events" aria-hidden="true">#</a></h2><p>To listen to events emitted by a child component, we need to add an event listener to the parent component, this is done the same way as we would with a native DOM element.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre><code><span class="line"><span style="color:#676E95;">// parent-component.ts</span></span>
<span class="line"><span style="color:#82AAFF;">render</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">html</span><span style="color:#89DDFF;">\`</span></span>
<span class="line"><span style="color:#C3E88D;">    &lt;my-component @myEvent=</span><span style="color:#89DDFF;">\${</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">handleEvent</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">&gt;&lt;/my-component&gt;</span></span>
<span class="line"><span style="color:#C3E88D;">  </span><span style="color:#89DDFF;">\`</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>When writing the event handlers, you need to make sure you&#39;re using the type <code>CustomEvent</code> to access the event data. The event data is available in the <code>detail</code> property of the event.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre><code><span class="line"><span style="color:#676E95;">// parent-component.ts</span></span>
<span class="line"><span style="color:#82AAFF;">handleEvent</span><span style="color:#A6ACCD;">(event: CustomEvent) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">detail</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#676E95;">// Logs &#39;Hello World!&#39; when the event is emitted</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="event-configuration" tabindex="-1">Event configuration <a class="header-anchor" href="#event-configuration" aria-hidden="true">#</a></h2><p>The <code>@Event()</code> decorator accepts an optional EventConfig object as a parameter, this object can be used to customize the event that will be created by the decorator.</p><div class="language-typescript"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre><code><span class="line"><span style="color:#89DDFF;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">interface</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">EventConfig</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">string</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">composed</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">bubbles</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#F07178;">cancelable</span><span style="color:#89DDFF;">?:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>By default, Xeito will use the property name as the event name, but you can change this by passing the name property in the event config object. The rest of the properties are used to configure the event, they are the same as the properties of the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event/Event" target="_blank" rel="noreferrer">Event</a> API.</p>`,17),l=[t];function p(c,r,i,y,F,D){return n(),e("div",null,l)}const v=s(o,[["render",p]]);export{h as __pageData,v as default};
