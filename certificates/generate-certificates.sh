#!/usr/bin/env bash
if [ -z "$1" ]
then
  echo "You need to supply a domain name";
  echo "e.g. ./generate-certificates.sh localhost"
  exit;
fi
if [ ! -f req_config.ext ]; then
  echo 'req_config.ext file was not found'
  exit;
fi
if [ ! -f x509_config.ext ]; then
  echo 'x509_config.ext file was not found'
  exit;
fi

DOMAIN=$(echo "$1" | tr -d '\n')
COMMON_NAME=${2:-*.$1}
NUM_OF_DAYS=825
SERVER_CERT_PATH="server-certificates"
ROOT_CERT_PATH="root-certificates"

if [ -f $SERVER_CERT_PATH/device.key ]; then
  KEY_OPT="-key"
else
  KEY_OPT="-keyout"
fi

# Create root certificates
openssl genrsa -out $ROOT_CERT_PATH/rootCA.key 2048
openssl req -x509 -new -nodes -key $ROOT_CERT_PATH/rootCA.key -sha256 -days 1024 -out $ROOT_CERT_PATH/rootCA.pem -config req_config.ext

# Create server certificates
openssl req -new -newkey rsa:2048 -sha256 -nodes $KEY_OPT $SERVER_CERT_PATH/device.key -out $SERVER_CERT_PATH/$DOMAIN.csr -config req_config.ext
openssl x509 -req -in $SERVER_CERT_PATH/$DOMAIN.csr -CA $ROOT_CERT_PATH/rootCA.pem -CAkey $ROOT_CERT_PATH/rootCA.key -CAcreateserial -out $SERVER_CERT_PATH/$DOMAIN.crt -days $NUM_OF_DAYS -sha256 -extfile x509_config.ext 

# Add root certificates to the system keychain
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain $ROOT_CERT_PATH/rootCA.pem

# Cleanup unecessary certificates
rm -f $SERVER_CERT_PATH/$DOMAIN.csr;
rm -f $ROOT_CERT_PATH/rootCA.srl;

# Validate certificates
result=$(openssl verify -CAfile $ROOT_CERT_PATH/rootCA.pem $SERVER_CERT_PATH/$DOMAIN.crt)
echo "Certificate Validation Result: $result"

echo "All certificates generated successfully!"
echo "Done."
