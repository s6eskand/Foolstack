package foolstack.server;

public class Constants {

    public final String GITHUB_API_URL = "https://api.github.com";
    public final String GITHUB_USER = String.format("%s/users/{:user}", GITHUB_API_URL);
    public final String GITHUB_REPO = String.format("%s/repos/{:user}/{:repo}", GITHUB_API_URL);

}