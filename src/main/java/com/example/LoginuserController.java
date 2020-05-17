package com.example;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class LoginuserController {
    private LoginuserRepository repository;

    @Autowired
    public LoginuserController(LoginuserRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Loginuser> get(@PathVariable("id") Long id) {
        Loginuser user = repository.findOne(id);
        if (null == user)
            return new ResponseEntity<Loginuser>(HttpStatus.NOT_FOUND);
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

    @RequestMapping(value = "/new", method = RequestMethod.POST)
    public ResponseEntity<Loginuser> update(@RequestBody Loginuser user) {
        repository.save(user);
        return get(user.getId());
    }

    @RequestMapping
    public List<Loginuser> all() {
        return repository.findAll();
    }
}
