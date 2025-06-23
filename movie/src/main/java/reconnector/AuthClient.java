package decare.reconnector;

import com.movie.movie.model.Movie;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

@FeignClient(name = "MOVIE-SERVICE")  // Eureka service name or app name
public interface AuthClient {
    @GetMapping("/movies/list")
    List<Movie> getAllMovies();
}
