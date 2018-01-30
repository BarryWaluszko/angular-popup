# angular-popup
Minimalistic popup skeleton for your Angular 2+ web application project. No external dependencies (of course except Angular).

# Description
Popup lives inside Angular component and is dynamically created insid DOM. Project contains following code snippets:
- pass variable to the popup from the parent component
- retrieve variable from popup to parent component
- popup can bye closed by button or ESC key on keyboard
- drag and drop example

Popup component is injected to the master component through: `ComponentFactoryResolver`, `ComponentFactory` and `ng-template`