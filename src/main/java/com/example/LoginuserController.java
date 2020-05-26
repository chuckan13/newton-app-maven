package com.example;

import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class LoginuserController {
    private LoginuserRepository repository;

    @Autowired
    public LoginuserController(LoginuserRepository repository) {
        this.repository = repository;
    }

    // @PreAuthorize("#id == principal.user.id")
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Loginuser> get(@PathVariable("id") Long id, Principal principal) {
        System.out.println(principal.getName());
        Loginuser user = repository.findOne(id);
        if (null == user)
            return new ResponseEntity<Loginuser>(HttpStatus.NOT_FOUND);

        String userName = user.getUserName();
        System.out.println(userName);
        if (!userName.equals(principal.getName())) {
            return new ResponseEntity<Loginuser>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<Loginuser>(user, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Loginuser> delete(@PathVariable("id") Long id) {
        Loginuser user = repository.findOne(id);
        if (user == null)
            return new ResponseEntity<Loginuser>(HttpStatus.NOT_FOUND);
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
            if (!foundLoginuser.getPassword().equals(loginuser.getPassword())) { // might be an issue if are equivalent
                                                                                 // but not equal
                return new ResponseEntity<Loginuser>(HttpStatus.METHOD_NOT_ALLOWED);
            }
            foundLoginuser.updateParameters(loginuser);
            repository.save(foundLoginuser);
            return get(foundLoginuser.getId(), principal);
        }
    }

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<Loginuser> update(@RequestBody Loginuser user, Principal principal) {
        repository.save(user);
        return get(user.getId(), principal);
    }

    @RequestMapping
    public List<Loginuser> all() {
        return repository.findAll();
    }
}
