package com.recetteapp.security.Seance;

import com.recetteapp.security.Domaine.Domaine;
import com.recetteapp.security.Domaine.Domainerepo;
import com.recetteapp.security.Domaine.domainerequest;
import com.recetteapp.security.auth.AuthenticationService;
import com.recetteapp.security.email.EmailSender;
import com.recetteapp.security.file.fileService;
import com.recetteapp.security.project.EtatCount;
import com.recetteapp.security.project.ProjectRepository;
import com.recetteapp.security.project.ProjectService;
import com.recetteapp.security.project.project;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v5/seance")
@RequiredArgsConstructor
public class SeanceController {
    private final ProjectService projectService;
    private final fileService FileService ;
    private final AuthenticationService authenticationService;
    private final ProjectRepository projectRepository;
    private  final EmailSender emailSender;
    private final Domainerepo domainerepo;
    private final SeanceService seanceService ;
private final SeanceRepo seanceRepo;


    @GetMapping("/find/{id}")
    public ResponseEntity<Seanceresponse> getprojectById(@PathVariable("id") Integer id){
        Seanceresponse seance= seanceService.findById(id);
        return new ResponseEntity<>(seance, HttpStatus.OK);
    }
    @PostMapping("/adddomaine")
    public ResponseEntity<?> add(@RequestBody seancerequest request) {
        try {
            Seance savedSeance = seanceService.register(request);
            return ResponseEntity.ok(savedSeance);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Email du vav metier est invalid mais las seance est ajouter quand meme veuillez lui informer manuelement ");
        }
    }
    @PutMapping("/seances/{id}")
    public ResponseEntity<?> updateSeance(@PathVariable Integer id, @RequestBody seancerequest request) {
        try {
            Seance updatedSeance = seanceService.update(id, request);
            return ResponseEntity.ok(updatedSeance);
        } catch (SeanceService.InvalidRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (SeanceService.SeanceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request");
        }
    }
    @DeleteMapping("/del/{seanceId}")
    public ResponseEntity<?> delete(@PathVariable Integer seanceId) {
        try {

            return ResponseEntity.ok(seanceService.delete(seanceId));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request");
        }
    }
    @GetMapping("/Seancebyvavorgaemail/{email}")
    public ResponseEntity<List<Seanceresponse>> getprojectById(@PathVariable("email") String email){
        List<Seanceresponse> seance= seanceService.findbyorgaemail(email);
        return new ResponseEntity<>(seance, HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity<  List<Seanceresponse>> getprojectById(){
        List<Seanceresponse> seance= seanceService.findall();
        return new ResponseEntity<>(seance, HttpStatus.OK);
    }
    @GetMapping("/Seancebyvavorgaemail2/{email}")
    public ResponseEntity<List<seanceinfo>> getprojectById2(@PathVariable("email") String email){
        List<seanceinfo> seance= seanceService.findbyorgaemail2(email);
        return new ResponseEntity<>(seance, HttpStatus.OK);
    }
    @GetMapping("/all2")
    public ResponseEntity<  List<seanceinfo>> getprojectById3(){
        List<seanceinfo> seance= seanceService.findall2();
        return new ResponseEntity<>(seance, HttpStatus.OK);
    }
    @GetMapping("/count/{email}/{statut}/{etats}")
    public ResponseEntity<Integer> getSeancesCountByFilters(@PathVariable("email") String email, @PathVariable("statut") String statut, @PathVariable("etats") String etats) {
        int count = seanceService.getSeancesCountByFilters(email, statut, etats);
        return ResponseEntity.ok(count);
    }
    @GetMapping("/findbyproject/{id}")
    public ResponseEntity<List<seanceinfo2>> getprojectByIdid(@PathVariable("id") Integer id){
        List<seanceinfo2> seance= seanceService.findbyprojectid(id);
        return new ResponseEntity<>(seance, HttpStatus.OK);
    }
    @GetMapping("/etat/count")
    public List<EtatCount> countProjectsByEtat() {
        List<Seance> projects = seanceRepo.findAll();
        Map<String, Long> etatCounts = projects.stream()
                .collect(Collectors.groupingBy(Seance::getStatut, Collectors.counting()));
        List<EtatCount> result = new ArrayList<>();
        for (Map.Entry<String, Long> entry : etatCounts.entrySet()) {
            EtatCount etatCount = new EtatCount(entry.getKey(), entry.getValue());
            result.add(etatCount);
        }
        return result;
    }
    @GetMapping("/etat/count/{year}")
    public List<EtatCount> countProjectsByEtat(@PathVariable int  year) {
        List<Seance> projects = seanceRepo.findAll();
        Map<String, Long> etatCounts = projects.stream()
                .filter(project -> project.getDatedajout().getYear() == year)
                .collect(Collectors.groupingBy(Seance::getStatut, Collectors.counting()));
        List<EtatCount> result = new ArrayList<>();
        for (Map.Entry<String, Long> entry : etatCounts.entrySet()) {
            EtatCount etatCount = new EtatCount(entry.getKey(), entry.getValue());
            result.add(etatCount);
        }
        return result;
    }
    @GetMapping("/etat/count/{year}/{month}")
    public List<EtatCount> countProjectsByEtat(@PathVariable int  year,@PathVariable int  month) {
        List<Seance> projects = seanceRepo.findAll();
        Map<String, Long> etatCounts = projects.stream()
                .filter(project -> project.getDatedajout().getYear() == year && project.getDatedajout().getMonthValue() == month)
                .collect(Collectors.groupingBy(Seance::getStatut, Collectors.counting()));
        List<EtatCount> result = new ArrayList<>();
        for (Map.Entry<String, Long> entry : etatCounts.entrySet()) {
            EtatCount etatCount = new EtatCount(entry.getKey(), entry.getValue());
            result.add(etatCount);
        }
        return result;
    }
}
