#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\ACC\mas_item\tab\_price.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "3ed0912e1c016c520dea0b253d6c848cde12e336"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.ACC.mas_item.tab.Pages_ACC_mas_item_tab__price), @"mvc.1.0.view", @"/Pages/ACC/mas_item/tab/_price.cshtml")]
namespace MIS_PORTAL.Pages.ACC.mas_item.tab
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"3ed0912e1c016c520dea0b253d6c848cde12e336", @"/Pages/ACC/mas_item/tab/_price.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_ACC_mas_item_tab__price : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<div class=\"tab-pane\" id=\"price\">\r\n    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "3ed0912e1c016c520dea0b253d6c848cde12e3363145", async() => {
                WriteLiteral(@"
        <div class=""row"">
            <div class=""col-sm-12"">

                <div class=""card card-success"">
                    <div class=""card-header pb-0"">
                        <h5 class=""card-title mb-0 pb-0"">????????????????????????????????????????????????</h5>
                    </div>
                    <div class=""card-body"">
                        <div class=""row"">
                            <div class=""col-sm-6"">
                                <div class=""row"">
                                    <label for=""item_gprice"" class=""col-sm-3 col-form-label tx-right"">?????????????????????(????????????????????????)</label>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 850, "\"", 864, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <label for=""item_gpricepur"" class=""col-sm-3 col-form-label tx-right"">?????????????????????(????????????????????????)</label>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1258, "\"", 1272, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>
                                <div class=""row"">
                                    <!-- ????????????????????? A -->
                                    <label for=""item_gprice"" class=""col-sm-3 col-form-label tx-right"">????????????????????? A/</label>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 1797, "\"", 1811, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2073, "\"", 2087, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2349, "\"", 2363, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <!-- ????????????????????? B -->
                                    <label for=""item_gprice"" class=""col-sm-3 col-form-label tx-right"">????????????????????? B/</label>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 2797, "\"", 2811, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3073, "\"", 3087, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3349, "\"", 3363, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <!-- ????????????????????? C -->
                                    <label for=""item_gprice"" class=""col-sm-3 col-form-label tx-right"">????????????????????? C/</label>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 3797, "\"", 3811, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4073, "\"", 4087, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4349, "\"", 4363, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <!-- ????????????????????? D -->
                                    <label for=""item_gprice"" class=""col-sm-3 col-form-label tx-right"">????????????????????? D/</label>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 4797, "\"", 4811, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5073, "\"", 5087, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5349, "\"", 5363, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <!-- ????????????????????? E -->
                                    <label for=""item_gprice"" class=""col-sm-3 col-form-label tx-right"">????????????????????? E/</label>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 5797, "\"", 5811, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 6073, "\"", 6087, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 6349, "\"", 6363, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <!-- ????????????????????? F -->
                                    <label for=""item_gprice"" class=""col-sm-3 col-form-label tx-right"">????????????????????? F/</label>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 6797, "\"", 6811, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 7073, "\"", 7087, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 7349, "\"", 7363, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>

                                </div>
                            </div>
                            <div class=""col-sm-6"">
                                <div class=""row"">
                                    <label for=""item_gprice"" class=""col-sm-3 col-form-label tx-right"">Sale Cost</label>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 7921, "\"", 7935, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <label for=""item_gpricepur"" class=""col-sm-3 col-form-label tx-right"">????????????????????????????????????</label>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 8324, "\"", 8338, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>
                                <div class=""row"">
                                    <label for=""item_gprice"" class=""col-sm-3 col-form-label tx-right"">Average Sale Cost</label>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 8814, "\"", 8828, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <label for=""item_gpricepur"" class=""col-sm-3 col-form-label tx-right"">Average Cost</label>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gpricepur"" name=""item_gpricepur""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 9217, "\"", 9231, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>
                                <div class=""row"">
                                    <label for=""item_gprice"" class=""col-sm-3 col-form-label tx-right"">????????? x ???????????????????????????</label>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 9705, "\"", 9719, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                    <label for=""item_gprice"" class=""col-sm-3 col-form-label tx-right"">???????????????????????????????????????????????????</label>
                                    <div class=""col-sm-3"">
                                        <input type=""text"" class=""form-control form-control-sm tx-right tx-bold"" id=""item_gprice"" name=""item_gprice""");
                BeginWriteAttribute("placeholder", " placeholder=\"", 10104, "\"", 10118, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=""col-sm-12"">
                <div class=""card card-primary"">
                    <div class=""card-header pb-0"">
                        <h5 class=""card-title mb-0 pb-0"">??????????????????????????? 2 (???????????????????????????)</h5>
                    </div>
                    <div class=""card-body"">
                        <table class=""table table-striped mg-b-0 text-md-nowrap"">
                            <thead>
                                <tr>
                                    <th>????????????????????????</th>
                                    <th>???????????????</th>
                                    <th>????????? x ???????????????????????????</th>
                                    <th>????????????????????????</th>
                                    <th>????????????????????? A</th>
                                    <th>????????????????????? B</th>
     ");
                WriteLiteral(@"                               <th>????????????????????? C</th>
                                    <th>????????????????????? D</th>
                                    <th>????????????????????? E</th>
                                    <th>????????????????????? F</th>
                                    <th>???????????????????????? Output</th>
                                    <th>Del</th>
                                    <th>PU</th>
                                    <th>????????????????????????????????????</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n</div>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
