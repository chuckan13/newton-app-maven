package com.example;

import org.springframework.security.crypto.encrypt.Encryptors;
import org.springframework.security.crypto.encrypt.TextEncryptor;
import org.springframework.security.crypto.keygen.KeyGenerators;

public class TestEncryption {
    final static String password = "2o6qK89ebqLAquMAgyOS4qV38aSu1WTBhhNgDUc9Tx8jBdVovq2yfGmxFh72OBy";

    public static String encrypt(String textToEncrypt, String salt) {
        if (textToEncrypt != null && !textToEncrypt.isEmpty()) {
            TextEncryptor encryptor = Encryptors.text(password, salt);
            String encryptedText = encryptor.encrypt(textToEncrypt);
            return encryptedText;
        }

        return null;

    }

    public static String decrypt(String encryptedText, String salt) {
        if (encryptedText != null && !encryptedText.isEmpty()) {
            TextEncryptor decryptor = Encryptors.text(password, salt);
            String decryptedText = decryptor.decrypt(encryptedText);

            return decryptedText;
        }

        return null;

    }
}
// public static void main(String[] args) {// https://www.grc.com/passwords.htm
// String salt = KeyGenerators.string().generateKey();
// String encryptThis = "Encrypt this text.";
// String encryptedText = encrypt(encryptThis, salt);
// String decryptedText = decrypt(encryptedText, salt);

// System.out.println(salt);
// System.out.println(encryptThis);
// System.out.println(encryptedText);
// System.out.println(decryptedText);
// }
// }