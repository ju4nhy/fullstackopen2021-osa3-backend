(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{20:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(1),a=t.n(c),o=t(15),r=t.n(o),i=(t(20),t(6)),u=t(3),s=t(0),l=function(e){var n=e.newFilter,t=e.handleFilterChange;return Object(s.jsxs)("div",{children:[Object(s.jsx)("h4",{children:"Search"}),Object(s.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.person,t=e.deletePerson;return Object(s.jsxs)("div",{className:"personContainer",children:[Object(s.jsxs)("label",{children:[n.name," ",Object(s.jsx)("b",{children:n.phone})]},n.id),Object(s.jsx)("button",{className:"deleteContact",onClick:function(){return t(n.id,n.name)},children:"Delete"})]})},h=function(e){var n=e.persons,t=e.newFilter,c=e.deletePerson,a=t?n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})):n;return Object(s.jsxs)("div",{children:[Object(s.jsx)("h4",{children:"Contact List"}),a.map((function(e){return Object(s.jsx)(d,{person:e,name:e.name,phone:e.phone,deletePerson:c},e.id)}))]})},j=function(e){var n=e.newName,t=e.newPhoneNum,c=e.handleNameChange,a=e.handlePhoneNumChange,o=e.addPerson;return Object(s.jsxs)("div",{children:[Object(s.jsx)("h4",{children:"Add contact"}),Object(s.jsxs)("form",{className:"container",children:[Object(s.jsx)("label",{children:"name: "}),Object(s.jsx)("input",{value:n,onChange:c}),Object(s.jsx)("label",{children:"phone: "}),Object(s.jsx)("input",{value:t,onChange:a}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{className:"addContact",type:"submit",onClick:o,children:"Add"})})]})]})},f=function(e){var n=e.message,t=e.errorMessage;return null===n?null:n===t?Object(s.jsx)("div",{className:"error",children:n}):Object(s.jsx)("div",{className:"notification",children:n})},b=t(4),O=t.n(b),m="/api/persons",p={getAll:function(){return O.a.get(m).then((function(e){return e.data}))},create:function(e){return O.a.post(m,e).then((function(e){return e.data}))},update:function(e,n){return O.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},forcedelete:function(e){return O.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))}},x=function(){var e=Object(c.useState)([]),n=Object(u.a)(e,2),t=n[0],a=n[1],o=Object(c.useState)(""),r=Object(u.a)(o,2),d=r[0],b=r[1],O=Object(c.useState)(""),m=Object(u.a)(O,2),x=m[0],v=m[1],g=Object(c.useState)(""),w=Object(u.a)(g,2),C=w[0],N=w[1],P=Object(c.useState)(null),A=Object(u.a)(P,2),S=A[0],y=A[1],F=Object(c.useState)(null),k=Object(u.a)(F,2),T=k[0],E=k[1];Object(c.useEffect)((function(){p.getAll().then((function(e){a(e)}))}),[]);var L=function(){if(window.confirm("".concat(d," is already added to phonebook. Replace the old phone number with a new one?"))){var e=t.find((function(e){return e.name===d})),n=Object(i.a)(Object(i.a)({},e),{},{phone:x});p.update(n.id,n).then((function(e){a(t.map((function(n){return n.id!==e.id?n:e}))),p.getAll().then((function(e){a(e)})),M(),y("Phone number updated for contact: ".concat(d)),setTimeout((function(){y(null)}),3e3)})).catch((function(e){E("Contact not found. ".concat(d," has already been removed from the server.")),setTimeout((function(){E(null)}),5e3)}))}},M=function(){b(""),v(""),N("")};return Object(s.jsxs)("div",{children:[Object(s.jsx)("h3",{children:"PHONEBOOK"}),Object(s.jsx)(l,{newFilter:C,handleFilterChange:function(e){N(e.target.value)}}),Object(s.jsx)(f,{message:S}),Object(s.jsx)(f,{message:T,errorMessage:T}),Object(s.jsx)(j,{newName:d,newPhoneNum:x,handleNameChange:function(e){b(e.target.value)},handlePhoneNumChange:function(e){v(e.target.value)},addPerson:function(e){if(e.preventDefault(),t.map((function(e){return e.name})).includes(d))L();else{var n={name:d,phone:x};p.create(n).then((function(e){e.name.length>=3&&e.phone.length>=8&&(y("Added new contact ".concat(d)),setTimeout((function(){y(null)}),3e3)),a(t.concat(e)),M()})).catch((function(e){E("".concat(e.response.data.error)),setTimeout((function(){E(null)}),3e3)}))}}}),Object(s.jsx)(h,{persons:t,newFilter:C,deletePerson:function(e,n){window.confirm("Are you sure you want to delete this contact?")&&p.forcedelete(e).then((function(){y("".concat(n," deleted")),setTimeout((function(){y(null)}),3e3),p.getAll().then((function(e){a(e)}))}))}})]})};r.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(x,{})}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.572d4d03.chunk.js.map