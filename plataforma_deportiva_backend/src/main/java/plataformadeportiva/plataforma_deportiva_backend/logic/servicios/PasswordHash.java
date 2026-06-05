package plataformadeportiva.plataforma_deportiva_backend.logic.servicios;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PasswordHash {

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public String hash(String password) {
        return encoder.encode(password);
    }

    public boolean verify(String password, String hash) {
        return encoder.matches(password, hash);
    }
}