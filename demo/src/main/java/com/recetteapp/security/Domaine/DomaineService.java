package com.recetteapp.security.Domaine;

import com.recetteapp.security.exeption.UserNotFoundException;
import com.recetteapp.security.project.*;
import com.recetteapp.security.user.User;
import com.recetteapp.security.user.User2;
import com.recetteapp.security.user.UserRepository;
import com.recetteapp.security.user2.user2repo;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DomaineService {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final user2repo User2repo;
    private final Domainerepo domainerepo;
    public Domaine addDomaine(domainerequest request) throws Exception {

Domaine exist =null;
String name=null;
        if (request.getName() != null) {
             name = request.getName();
            int count = 1;
            while (domainerepo.findByName(name).isPresent()) {
                name = request.getName() + " (" + count + ")";
                count++;
            }
            // At this point, `name` should contain a unique domain name
            // based on the original name and any existing names in the database.
        }
    else {name= request.getName();
}
        User orga = null;
        if (request.getVav_orga() != null) {
            orga = userRepository.findByEmail(request.getVav_orga())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));
        }



        User2 resporga = null;
        if (request.getResorga() != null) {
            resporga = User2repo.findByEmail(request.getResorga())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));


        } User2 metier = null;
        if (request.getVav_metier() != null) {
            metier = User2repo.findByEmail(request.getVav_metier())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));


        }
        User2 respmetier = null;
        if (request.getRespmetier() != null) {
            respmetier = User2repo.findByEmail(request.getRespmetier())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));


        }
        User2 etude = null;
        if (request.getVav_etude() != null) {
            etude = User2repo.findByEmail(request.getVav_etude())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));


        }
        User2 respetude = null;
        if (request.getRespEtude() != null) {
            respetude = User2repo.findByEmail(request.getRespEtude())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));


        }
        Domaine domaine = Domaine.builder()
                .name(name)
                .vav_metier(metier)
                .vavorga(orga)
                .vav_etude(etude)
                .resorga(resporga)
                .RespEtude(respetude)
                .respmetier(respmetier)



                .build();


        Domaine savedDomaine = domainerepo.save(domaine);

        return savedDomaine;
    }
    public Domaine updateDomaine( Integer id, domainerequest request) throws Exception {

        Domaine domaine = domainerepo.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Domaine not found"));
        if (request.getName() != null) {

        domaine.setName(request.getName());
        }


        if (request.getVav_orga() != null) {
            User orga = userRepository.findByEmail(request.getVav_orga())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));
            domaine.setVavorga(orga);
        }

        if (request.getResorga() != null) {
            User2 resorga = User2repo.findByEmail(request.getResorga())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));
            domaine.setResorga(resorga);
        }

        if (request.getVav_metier() != null) {
            User2  metier = User2repo.findByEmail(request.getVav_metier())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));
            domaine.setVav_metier(metier);
        }



        if (request.getRespmetier() != null) {
            User2 respmetier = User2repo.findByEmail(request.getRespmetier())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));
            domaine.setRespmetier(respmetier);
        }


        if (request.getVav_etude() != null) {
            User2 etude = User2repo.findByEmail(request.getVav_etude())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));
            domaine.setVav_etude(etude);
        }



        if (request.getRespEtude() != null) {
            User2  respetude = User2repo.findByEmail(request.getRespEtude())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));
            domaine.setRespEtude(respetude);
        }

        Domaine savedDomaine2 = domainerepo.save(domaine);

        return savedDomaine2;
    }
    public boolean deleteDomaine2(Integer id) {

            try {
                domainerepo.deleteById(id);
                return true;
            } catch (Exception ex) {
                return false;
            }
        }
    public domainerequest findById(Integer id) {
       Domaine  domaine = domainerepo.findById(id).orElseThrow(()-> new UserNotFoundException("user with id"+id+"notfound"));;
        domainerequest Domainerequest=new domainerequest();
        Domainerequest.setName(domaine.getName());

        Domainerequest.setResorga(domaine.getResorga().getEmail());
        Domainerequest.setRespEtude(domaine.getRespEtude().getEmail());
        Domainerequest.setRespmetier(domaine.getRespmetier().getEmail());
        Domainerequest.setVav_etude(domaine.getVav_etude().getEmail());
        Domainerequest.setVav_metier(domaine.getVav_metier().getEmail());
        Domainerequest.setVav_orga(domaine.getVavorga().getEmail());

return Domainerequest ;
    }
    public domainerequest findByname(String name) {
        Domaine  domaine = domainerepo.findByName(name).orElseThrow(()-> new UserNotFoundException("user with name"+name+"notfound"));;
        domainerequest Domainerequest=new domainerequest();
        Domainerequest.setName(domaine.getName());

        Domainerequest.setResorga(domaine.getResorga().getEmail());
        Domainerequest.setRespEtude(domaine.getRespEtude().getEmail());
        Domainerequest.setRespmetier(domaine.getRespmetier().getEmail());
        Domainerequest.setVav_etude(domaine.getVav_etude().getEmail());
        Domainerequest.setVav_metier(domaine.getVav_metier().getEmail());
        Domainerequest.setVav_orga(domaine.getVavorga().getEmail());

        return Domainerequest ;
    }
    public List<Domaineinfo> findAlldomaines2() throws Exception {
        List<Domaine> domaines = domainerepo.findAll(Sort.by(Sort.Direction.DESC, "id"));
        if (domaines.isEmpty()) {
            throw new DomaineService.DomainNotFoundException("No domaine found.");
        }


        List<Domaineinfo> domainInfos = new ArrayList<>();
        for (Domaine domaine :domaines) {
            Domaineinfo Domainerequest=new Domaineinfo();
Domainerequest.setId(domaine.getId());
            if(domaine.getName()!=null) {
    Domainerequest.setName(domaine.getName());
}else{Domainerequest.setName("No name");}
            if(domaine.getResorga()!=null) {
            Domainerequest.setResorga(domaine.getResorga().getFirstname()+" "+domaine.getResorga().getLastname());
            }else{Domainerequest.setResorga("Pas de responsable orga");}
            if(domaine.getRespEtude()!=null) {
            Domainerequest.setRespEtude(domaine.getRespEtude().getFirstname()+" "+domaine.getRespEtude().getLastname());
            }else{Domainerequest.setRespEtude("Pas de responsable etude");}
            if(domaine.getRespmetier()!=null) {
            Domainerequest.setRespmetier(domaine.getRespmetier().getFirstname()+" "+domaine.getRespmetier().getLastname());
            }else{Domainerequest.setRespmetier("Pas de responsable metier");}
            if(domaine.getVav_etude()!=null) {
            Domainerequest.setVav_etude(domaine.getVav_etude().getFirstname()+" "+domaine.getVav_etude().getLastname());
            }else{Domainerequest.setVav_etude("Pas de vis a vis etude");}
            if(domaine.getVav_metier()!=null) {
            Domainerequest.setVav_metier(domaine.getVav_metier().getFirstname()+" "+domaine.getVav_metier().getLastname());
            }else{Domainerequest.setVav_metier("Pas de vis a vis metier");}
            if(domaine.getVavorga()!=null) {
            Domainerequest.setVav_orga(domaine.getVavorga().getFirstname()+" "+domaine.getVavorga().getLastname());
            }else{Domainerequest.setVav_orga("Pas de vis a vis orga");}

            domainInfos.add(Domainerequest);
        }


        return domainInfos;
    }
    public class DomainNotFoundException extends RuntimeException {
        public DomainNotFoundException(String message) {
            super(message);
        }
    }
}
