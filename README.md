# House of Aparna

Ye aapki website ka poora project hai — clothes, accessories aur shoes bechne ke liye.

## Website ko live (host) kaise karein — GitHub + Vercel se

### Step 1: GitHub account banao
1. [github.com](https://github.com) kholo → **Sign up** → apna email aur ek password daalo.

### Step 2: Naya repository banao
1. GitHub mein login karke, top-right pe **+** icon → **New repository**.
2. Naam do: `house-of-aparna`
3. **Create repository** dabao.

### Step 3: Ye files GitHub pe upload karo
1. Naye repository page pe, **"uploading an existing file"** link pe click karo.
2. Is poore folder (`house-of-aparna`) ke andar ki saari files aur folders drag-and-drop karo.
3. Neeche **Commit changes** dabao.

### Step 4: Vercel se deploy karo
1. [vercel.com](https://vercel.com) kholo → **Continue with GitHub** (isse alag password nahi banana padega).
2. **Add New → Project** dabao.
3. Apni `house-of-aparna` repository select karo → **Import**.
4. Sab settings default hi rakho, bas **Deploy** dabao.
5. 1-2 minute mein website live ho jayegi — ek link milega jaise `house-of-aparna.vercel.app`.

Bas! Ab ye link kisi ko bhi bhej sakte ho, website duniya mein kahin se bhi khul jayegi.

## Baad mein khud ka domain (jaise houseofaparna.com) jodna ho to
Vercel project ke **Settings → Domains** mein jaake apna kharida hua domain add kar sakte ho. Domain kisi bhi provider se kharid sakte ho (GoDaddy, Namecheap, ya seedha Vercel se bhi).

## Products add/change karne ke liye
`src/LibaasStore.jsx` file kholo, `PRODUCTS` list dhoondo, aur naya product is tarah add karo:

```js
{ id: 13, name: "Naya Product", cat: "clothes", price: 1299, tagline: "Chhota description" },
```

`cat` sirf `"clothes"`, `"accessories"`, ya `"shoes"` mein se ek hoga.

## Payment (Razorpay) baad mein add karne ke liye
Jab Razorpay account ban jaye aur API keys mil jayein, Claude ko bata dena — backend code alag se banega jo is website se jodega.
