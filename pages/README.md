# App Router in Next.js

## Why This Folder Structure Exists

The approach is to move the Next.js `app` folder to the root folder of the project and import the FSD `pages` into the Next.js `app` folder. This saves the FSD project structure inside the `src` folder. Additionally, you should still include a `pages` folder at the root, because the App Router is compatible with the Pages Router.

## Project Structure

```bash
├── app                # Next.js app folder
├── pages              # Stub Next.js pages folder
│   ├── README.md      # Description of why this folder exists
├── src
│   ├── app            # FSD app folder
│   ├── entities
│   ├── features
│   ├── pages          # FSD pages folder
│   ├── shared
│   ├── widgets
```
