package com.recetteapp.security.history;

import com.recetteapp.security.Seance.Seance;
import com.recetteapp.security.Seance.seancerequest;
import com.recetteapp.security.project.project;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.List;

@RestController
@RequestMapping("/api/v8/History")
@RequiredArgsConstructor
public class HistoryController {
    private final Historyrepo historyrepo;
    private final HistoryService historyService;


    @PostMapping("/adddomaine")
    public ResponseEntity<History> add(@RequestBody History request) throws Exception {
        return ResponseEntity.ok(historyService.addoper(request));
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<List<hisinfo>> getprojectById(@PathVariable("id") Integer id){
        List<hisinfo> Project= historyService.findHistory(id);
        return new ResponseEntity<>(Project, HttpStatus.OK);
    }

    @GetMapping("/projects/{projectName}/duration")
    public Double calculateProjectDuration(@PathVariable Integer projectName) {
        return historyService.calculateProjectDuration(projectName);
    }
    @GetMapping("/projects/duration")
    public Double calculateProjectaverageduration() {
        return historyService.calculateAverageProjectDuration();
    }
    @GetMapping("/projects/duration/{year}")
    public Integer calculateProjectretour(@PathVariable Integer year) {
        return historyService.countRetourByYear(year);
    }
}
