Everything that is stay alive/active through the lifetime of the application is added here. It is important that you
shouldn't add any of the code that is supposed to be lazy loaded here. While initial loading all codes that are part of
core module, app module, shared module will be loaded skipping all features.

---

P-\* components are pages

E-\* components are error

---

PUBLIC Routes are meant to be used without Auth. Such as Error Pages, Warnings, Notes, Terms, Privacy Policy etc. We can
summarise it like views that are common to all audiences.

PRIVATE Routes are for authenticated users, it can be authorised or unauthorised pages. Any Features or Pages that is
supposed to be presented to a user or to a user group.

---
