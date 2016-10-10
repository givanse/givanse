They still serve a purpose, but their main reason of existence is for the internals of the framework and for Ember apps to communicate with the outside world.

> Observers are used heavily within the Ember framework itself, but for most problems Ember app developers face, computed properties are the appropriate solution.
[Ember v2.8.0 - The Object Model](https://guides.emberjs.com/v2.8.0/object-model/observers/)

The end result of an observer and a computed property is the same, except that computed properties are lazy loaded and cached.

Demo: [Ember runloop demonstration with a computed property and an observer](https://ember-twiddle.com/57eed26408aa0aeea2f9f4b3095a0a27?fileTreeShown=false&openFiles=components.foo-bar.js%2C)

<div style="position: relative; height: 0px; overflow: hidden; max-width: 100%; padding-bottom: 100%;">
<iframe src="https://ember-twiddle.com/57eed26408aa0aeea2f9f4b3095a0a27?fullScreen=true" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"></iframe></div>

Usually what happens is that a computed property is not being re-calculated and updated as it was expected to do so and
the quick fix is to use an observer instead. That is not a fix, it is a band aid.
In a follow up article I'll cover how to fix computed properties that doesn't seem to work consistently.

> observers are the data binding hammer, but few things are truly nails
>
> [The Observer tip-jar by Stefan Penner](https://youtu.be/vvZEddrClAQ?t=4m12s)

Observers are the right tool when syncing data that is being shared with another application.
The usual examples are apps that do data visualization or maps rendering.
The data that an Ember app is holding might be modified by the other app and we must be notified of those changes so that both apps are always in sync.

Some Examples:

[ember-leaflet](https://github.com/miguelcobain/ember-leaflet/blob/692568d6d1e2b693d09e5eb91438cb58b7000833/addon/components/marker-layer.js#L37)
```
  // icon observer separated from generated (leaflet properties) due to a
  // leaflet bug where draggability is lost on icon change
  iconDidChange: observer('icon', function() {
    this._layer.setIcon(this.get('icon'));
```

[ember-leaflet](https://github.com/miguelcobain/ember-leaflet/blob/692568d6d1e2b693d09e5eb91438cb58b7000833/addon/components/popup-layer.js#L31)
```
  popupOpenDidChange: observer('popupOpen', function() {
```

[liquid-fire](https://github.com/ember-animation/liquid-fire/blob/00cdf2e72794eac50c717bacdb14fb6e2971fe3d/addon/components/liquid-spacer.js#L23)
```
  sizeChange: Ember.observer('measurements', function() {
```

[ember-highcharts](https://github.com/ahmadsoe/ember-highcharts/blob/master/README.md)
```
  contentDidChange: Ember.observer('content.@each.isLoaded', function() {
    // add redraw logic here. ex:
```
