package com.example;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class LoginuserController {

    private LoginuserRepository repository;

    @Autowired
    public LoginuserController(LoginuserRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Loginuser> get(@PathVariable("id") Long id, Principal principal) {
        Loginuser user = repository.findOne(id);
        if (null == user)
            return new ResponseEntity<Loginuser>(HttpStatus.NOT_FOUND);

        String userName = user.getUserName();
        if (!userName.equals(principal.getName())) {
            return new ResponseEntity<Loginuser>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<Loginuser>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Loginuser> delete(@PathVariable("id") Long id, Principal principal) {
        Loginuser user = repository.findOne(id);
        if (user == null)
            return new ResponseEntity<Loginuser>(HttpStatus.NOT_FOUND);
        if (!user.getUserName().equals(principal.getName())) {
            return new ResponseEntity<Loginuser>(HttpStatus.FORBIDDEN);
        }
        repository.delete(user);
        return new ResponseEntity<Loginuser>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
    public ResponseEntity<Loginuser> editUser(@PathVariable("id") Long id, @RequestBody Loginuser loginuser,
            Principal principal) {
        Loginuser foundLoginuser = repository.findOne(id);
        if (null == foundLoginuser)
            return new ResponseEntity<Loginuser>(HttpStatus.NOT_FOUND);
        else {
            if (!foundLoginuser.getUserName().equals(principal.getName())) {
                return new ResponseEntity<Loginuser>(HttpStatus.FORBIDDEN);
            }
            foundLoginuser.updateParameters(loginuser);
            repository.save(foundLoginuser);
            return get(foundLoginuser.getId(), principal);
        }
    }

    @RequestMapping(value = "/username/{userName:.+}", method = RequestMethod.GET)
    public ResponseEntity<Loginuser> getByUserName(@PathVariable("userName") String userName, Principal principal)
            throws UnsupportedEncodingException {
        String resultName = URLDecoder.decode(userName, "UTF-8");
        Loginuser user = repository.findByUserName(resultName);
        if (user == null)
            return new ResponseEntity<Loginuser>(HttpStatus.NOT_FOUND);
        else {
            if (!user.getUserName().equals(principal.getName())) {
                return new ResponseEntity<Loginuser>(HttpStatus.FORBIDDEN);
            }
            return new ResponseEntity<Loginuser>(user, HttpStatus.OK);
        }

    }

    @RequestMapping(value = "/username/{userName:.+}", method = RequestMethod.PATCH)
    public ResponseEntity<Loginuser> editUserByUserName(@PathVariable("userName") String userName,
            @RequestBody Loginuser loginuser, Principal principal) throws UnsupportedEncodingException {
        String resultName = URLDecoder.decode(userName, "UTF-8");
        Loginuser foundLoginuser = repository.findByUserName(resultName);
        if (null == foundLoginuser)
            return new ResponseEntity<Loginuser>(HttpStatus.NOT_FOUND);
        else {
            if (!foundLoginuser.getUserName().equals(principal.getName())) {
                return new ResponseEntity<Loginuser>(HttpStatus.FORBIDDEN);
            }
            foundLoginuser.updateParameters(loginuser);
            repository.save(foundLoginuser);
            return get(foundLoginuser.getId(), principal);
        }
        // System.out.println(foundLoginuser.getUserName());

    }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<Loginuser> update(@RequestBody Loginuser user, Principal principal) {
        repository.save(user);
        return get(user.getId(), principal);
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody Loginuser user) {
        user.setPassword(NoOpPasswordEncoder.getInstance().encode(user.getPassword()));
        repository.save(user);
    }

    @RequestMapping
    public List<Loginuser> all() {
        return repository.findAll();
    }
}