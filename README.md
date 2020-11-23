# Bixindex customer portal

## Start the app locally

### Create certificate

- create a folder named `certificates`
- `cd` into it
- run the following command:
```
openssl req -x509 -out localhost.crt -keyout localhost.key \
  -days 365 \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

### Run the app

- setup the `hosts` file on your computer (`sudo nano /etc/hosts`)
- add line below localhost: `127.0.0.1 bix.local`
- run `yarn dev`
- open browser on `bix.local:3001`
