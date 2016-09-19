using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MyAngularCoreProject.Services;

namespace TrainingFinalProject {
  public class Startup {

    //public IConfigurationRoot Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services) {
      // Add framework services.
      services.AddMvc();
      // Add dependencies
      services.AddTransient<IUserService, UsersService>();
      services.AddTransient<IPostService, PostsService>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app) {
      app.UseDefaultFiles();
      app.UseStaticFiles();

      app.UseMvc();
    }
  }
}
