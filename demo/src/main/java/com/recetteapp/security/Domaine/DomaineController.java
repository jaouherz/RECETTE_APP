package com.recetteapp.security.Domaine;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v4/Domaine")
@RequiredArgsConstructor
public class DomaineController {
    private final DomaineService service;
    @PostMapping("/adddomaine")
    public ResponseEntity<Domaine> add(
            @RequestBody domainerequest request
    ) throws Exception {
        return ResponseEntity.ok(service.addDomaine(request));
    }

    @PutMapping("/updatedomaine/{id}")
    public ResponseEntity<Domaine> update(@PathVariable Integer id,
            @RequestBody domainerequest request
    ) throws Exception {
        return ResponseEntity.ok(service.updateDomaine(id,request));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteProject(@PathVariable Integer id) throws Exception {

        return  ResponseEntity.ok(service.deleteDomaine2(id));
    }
    @GetMapping("/findid/{id}")
    public ResponseEntity<domainerequest> getUserByid(@PathVariable("id") Integer id){
        domainerequest domaine = service.findById(id);

        return new ResponseEntity<>(domaine, HttpStatus.OK);

    }
    @GetMapping("/findname/{name}")
    public ResponseEntity<domainerequest> getUserByid(@PathVariable("name") String name){
        domainerequest domaine = service.findByname(name);

        return new ResponseEntity<>(domaine, HttpStatus.OK);

    }
    @GetMapping("/Domaines")


    public ResponseEntity<List<Domaineinfo>> getAllusers() throws Exception {
        List<Domaineinfo> proj = service.findAlldomaines2();
        return new ResponseEntity<>(proj, HttpStatus.OK);
    }
}
