<div class="row row_max_w">
  <div class="col-xs-12">
    <img class="img-responsive" alt="controller tower" src="/static/img/control_tower.jpg">
  </div>
</div>

<p>
  Today is common to see employment opportunities listing MVC as required knowledge.
  Also, almost every web-related framework or library uses it as a sign of neat design, and it is.
  MVC has become a buzzword, and we generously spread it around; however, much misinterpretation
  surrounds it. 
  Lack of clarity on this topic is a leading source of frustration when trying to learn new MVC tools.
  So, from where does the confusion come?
</p>

## Misconception

<p>
  In many cases undergraduates of a 
  <a href="http://www.joelonsoftware.com/articles/ThePerilsofJavaSchools.html">JavaSchool</a>,
  at some point, are required to build GUIs with Swing.
  Soon enough they will hear somewhere that Swing is modeled after MVC.
  A quick Internet search shows them a few, easy to remember, diagrams and they learn the basics of the pattern.
  A common transition from writing Desktop apps is to look into how to make web applications.
  Since Java is very popular among enterprises;
  the obvious choice is to learn Java EE.
  Of course, there will be plenty of MVC references on introductory material fro Servlets and JSPs. Many will think:
  Many will think:
  <blockquote>
    Duh! it is just like Swing, I already know what MVC is. 
  </blockquote> 
</p>

<p>
  Even if the Java path was not travelled; the history repeats regardless of the technology. 
  In the first contact with MVC, 
  a shallow Internet search returns a few diagrams that allow a quick grasp 
  of the general reasonings and benefits behind the pattern.
  <blockquote>
    So, no big deal, I get it! It is so obvious, this pattern is easy. 
  </blockquote>
  Indeed, it is easy. So, most will go on to work thinking that the generals of MVC are covered and fully understood. Later the head banging against the wall begins because not everything is tied together as some of the consulted texts said it would.
</p>

## Classic MVC

<p>
  Trygve Reenskaug first described MVC using Smalltalk-79; later, Krasner and Pope described the pattern in a paper using Smalltalk-80, which included a few minimal changes to the terminology. Since the beginning MVC has been conceptualized with slight variations; through time, an ever-changing nature has furthered the confusion among newcomers.
</p>

<p>
  You can dig deeper into the history of MVC in the following, cleverly named, blog posts: 
  <ul>
    <li>
      <a href="http://www.sicpers.info/2014/01/meaningless-vapid-catchphrase/">Meaningless Vapid Catchphrase</a>
    </li>
    <li>
      <a href="http://www.sicpers.info/2014/02/moderately-valuable-cliche/">Moderately Valuable Cliché</a>
    </li>
    <li>
      <a href="http://www.sicpers.info/2014/02/missing-vital-content/">Missing Vital Content</a>
    </li>
  </ul>
</p>

<p>
  For many, in their first encounter with MVC, the point of reference that is acquired is what either Smalltalk-79 or Smalltalk-80 described; i.e. the general triangle diagram. This resource mainly teaches how MVC came to be; but, if used as an actual reference for development, it will turn out to be misleading.
</p>

<p class="text-center">
  <img class="img-responsive" alt="MVC by Krasner and Pope" src="/static/img/mvc_krasner_pope.png">
  <small>MVC by Krasner and Pope, the triangle diagram.</small>
</p>

<p>
  To make matters worse;
  some try to bring the original concepts, that are part of Desktop GUIs development to web applications, which causes confusion because:
  <ul>
    <li>
      There are not modern applications that use the classic pattern.
    </li>
    <li>
      Architecture designs for GUIs can't be applied directly to web applications.
    </li>
  </ul>
</p>

<blockquote>
  <p>
    Indeed one could almost say that MVC disappeared... 
  </p>
  <footer>
    Martin Fowler in 
    <a href="http://martinfowler.com/eaaDev/uiArchs.html#ModelViewController">
      <cite title="Model View Controller">Model View Controller</cite>
    </a>
  </footer>
</blockquote>

## Context

<p>
  A key point, not mentioned often enough is that:
  <b>MVC patterns are understood better within a context.</b>
  Design considerations like development environment and platform specific motivations produce different flavors of MVC.
</p>

<p>
  Going back to the Java scenario; 
  The <a href="http://www.oracle.com/technetwork/java/architecture-142923.html">
  Swing architecture</a> uses a modified MVC tailored to the design goals of the toolkit and 
  the characteristics of its environment (Beans, IDEs, AWT). 
  Likewise, Java EE does not use classical MVC;
  neither the version that Swing produced.
  It uses what we will call server side MVC, more about that will follow below.
</p>

## MVC Family Rundown

<p>
  The purpose of the information below is to show design patterns
  that sprouted from MVC;
  presented in chronological lists and grouped by similarity.
  Below we will mention some of these MVC club members.
</p>

<p>
  Be aware that the relationships between them are more complex than what this simple list presents.
  A complete and detailed diagram can be seen here:
  <a target="_blank" href="http://mvc.givan.se/">mvc.givan.se</a> 
</p>

<ul>
  <li>1979 TMVE - Thing Model View Editor</li>
  <li>1979 MVC - Trygve Reenskaug revamp of his TMVE</li>
  <li>1988 MVC - Krasner and Pope paper</li>
</ul>
<br>

<ul>
  <li>1987 PAC - Presentation Abstraction Controll</li>
  <li>2000 HMVC - Hierarchical MVC</li>
</ul>
<br>

<ul>
  <li>1987 AM - Application Model</li>
  <li>1996 MVP - Model View Presenter</li>
  <li>2004 PM - Presentation Model</li>
  <li>2005 MVVM - Model View View Model</li>
</ul>
<br>

<ul>
  <li>1998 Model 2 - Sun's Java Model 2</li>
</ul>

<p>
  There are several variations from where to pick. However, don't feel overwhelmed, they all have a lot in common, so it is easy to learn about them.
</p>

## Server MVC

<p>
  This variation of the pattern was the one that made popular MVC, mainly through Rails and Struts.
</p>

<p>
  Server-side MVC is different because its context and design goals are different.
  A fundamental characteristic of server-side applications is that they are built to respond to 
  remote requests. 
  All user input and interaction have a single point of entry to the system; usually through HTTP requests. Since HTTP is a 
  <a href="http://en.wikipedia.org/wiki/Stateless_protocol">stateless protocol</a>, the environment is very different from traditional Desktop apps; thus, MVC changes and adapts according to it.
  That scenario is very different from the GUI arena where we have state and multiple entry points (peripherals).
</p>

<p>
  The <a href="http://en.wikipedia.org/wiki/Model_2">Java Model 2</a> design is the approach that server side technologies use nowadays.
  This design shares the same philosophy as traditional MVC, and most of its components resemble it,
  so we all call it just MVC; it is not incorrect, although inexact too.
</p>

<p>
  Every single popular server-side framework built on top of the ideas provided by Model 2, it is easy to see how that contributes to the cloudiness of the slogan: MVC.
</p>

## Client MVC
<p>
  Modern web applications have evolved to be huge projects with lots of functionality on the client side.
  We need to dynamically add, remove or hide elements from the DOM; trigger animations; validate and process data.
  Those requirements resulted in files stuffed with JQuery code and functions over 9000 lines long.
<p>

</p>
  Code like that is not easy to modify or share. 
  The natural thing to do is to apply software design patterns to organize the mess, of course, MVC is a clear pick since we are building GUIs.
  (Finding solutions for this problem marks the beginning of the JS Frameworks era.)
</p>

<p>
  Just as before, the client context and design goals are different, which gives us a different breed of MVCs.
  Interestingly, even within client-side MVC, we find different variations; 
  each provider adds its personal take to the pattern.
  For example, 
  Angular defines itslef as 
  <a href="https://plus.google.com/+AngularJS/posts/aZNVhj355G2">MVW</a>,
  Ember is close to
  <a href="http://www.wekeroad.com/2014/05/28/the-frustratingly-lovable-crazy-making-huggable-ball-of-whack-that-is-ember-js/">MVVM</a>;
  Backbone seems to be closer to
  <a href="http://addyosmani.com/blog/understanding-mvc-and-mvp-for-javascript-and-backbone-developers/">MVP</a>.
  It is useful to know this as generalities; but, if to try to define with precision what shape each has will end up triggering unproductive flamewars.
</p>

## Server MVC vs. Client MVC?

<blockquote>    
  Should I use MVC in the client or will I be fine just using it in the server?
</blockquote>    

<p>
  Let's allow us a brief digression here because this is a question that comes up frequently;
  the answer is: <b>That is the wrong question to ask</b>.
</p>

<p>
  In a single word, what MVC provides is <b>structure</b>, sprinkle some of that everywhere;
  every project, on any platform, can benefit from it.
  A better concern to ponder about is performance and how much work the server and the client do, usually stated as:

  <blockquote>Server rendering vs. Client rendering?</blockquote>

  That is a topic that can be discussed at length, doesn't seem to have a clear-cut answer.
</p>

## Be Ready

<p>
  Just recently a new pattern has been proposed, 
  <a href="https://mutualmobile.com/resources/meet-viper-mutual-mobiles-application-of-clean-architecture-for-ios-apps">VIPER</a>
  for View Interactor Presenter Entity Router.
  The description makes no references to MVC. However, it would not be a surprised to see it tagged as such later on.
</p>

<blockquote>
  VIPER is an application of 
  <a href="http://blog.8thlight.com/uncle-bob/2012/08/13/the-clean-architecture.html">Clean Architecture</a>
  to iOS apps.
</blockquote>

<p>
  We must be aware that new and better designs are yet to come.
  We have built, with a high degree of success, modular applications that 
  separate business logic from presentation and user interaction;
  but, we are from done.
  Ever larger applications and new technologies will keep demanding from us new architectures.
</p>

<p>
  If I want to keep synchronized my mobile phone, social media underpants, and flexible screen t-shirt;
  do everything is sent to the cloud or do I add a layer that connects them locally and treats all of them as a single app?
  Where will the data from a 100-biosensors device be processed?
  What about the code that handles holographic projection, is that still a view?
  Sooner than later we will be coming up with new designs tailored to such needs.
</p>

## Conclusion

<p>
  MVC is not an off-the-shelf design pattern that you can apply directly to a project.
  MVC is not an off-the-shelf design pattern that a project can apply directly. The next time the buzzword MVC drops, think marketing blurb and ask for context (requirements and assumptions).
</p>

<p>
  My suggestion is, when learning a new MVC tool, be aware of the context and its platform.
  Try to find out the actual pattern used as the base design (MVP, MVVM, etc.), 
  but just to give you a closer point of reference; don't take it to the letter.
  More likely than not, design choices had to be made and might have caused a deviation from the original pattern.
  Ultimately, your application should dictate what design surfaces.
</p>
