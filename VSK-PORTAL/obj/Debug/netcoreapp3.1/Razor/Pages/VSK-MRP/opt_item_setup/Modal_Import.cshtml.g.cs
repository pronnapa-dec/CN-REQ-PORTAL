#pragma checksum "D:\Project\vsk-project\MIS-PORTAL-8099\CN-REQ-PORTAL\VSK-PORTAL\Pages\VSK-MRP\opt_item_setup\Modal_Import.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "52fe516adaccea6eba5d8ed99c7368b21cbfc73e"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.VSK_MRP.opt_item_setup.Pages_VSK_MRP_opt_item_setup_Modal_Import), @"mvc.1.0.view", @"/Pages/VSK-MRP/opt_item_setup/Modal_Import.cshtml")]
namespace MIS_PORTAL.Pages.VSK_MRP.opt_item_setup
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
#line 1 "D:\Project\vsk-project\MIS-PORTAL-8099\CN-REQ-PORTAL\VSK-PORTAL\Pages\_ViewImports.cshtml"
using MIS_PORTAL;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"52fe516adaccea6eba5d8ed99c7368b21cbfc73e", @"/Pages/VSK-MRP/opt_item_setup/Modal_Import.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_VSK_MRP_opt_item_setup_Modal_Import : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm-import"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            WriteLiteral(@"<!-- Scroll with content modal -->
<div class=""modal effect-flip-vertical"" id=""modal-import"" data-keyboard=""false"" data-backdrop=""static"">
    <div class=""modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered"" role=""document"">
        <div class=""modal-content"" style=""width:110%"">
            <div class=""modal-header"">
                <h6 class=""modal-title"" style=""font-size:14px;"">Import item setup</h6>
                <button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
            </div>
            <div class=""modal-body"">
                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "52fe516adaccea6eba5d8ed99c7368b21cbfc73e4250", async() => {
                WriteLiteral(@"
                    <div class=""row row-sm"">
                        <div class=""col-sm-12 col-xl-4 col-lg-12 col-md-12"">
                            <div class=""card "">
                                <div class=""card-body"">
                                    <div class=""counter-status d-flex md-mb-0"">
                                        <div class=""counter-icon bg-primary-transparent"">
                                            <i class=""icon-layers text-primary""></i>
                                        </div>
                                        <div class=""ml-auto"">
                                            <h5 class=""tx-13"">Total Orders</h5>
                                            <h2 id=""total-item"" class=""counter mb-0 tx-22 mb-1 mt-1 total-item"">0</h2>
                                            <p class=""text-muted mb-0 tx-11""><i class=""si si-arrow-up-circle text-success mr-1""></i>increase</p>
                                        </div>
                            ");
                WriteLiteral(@"        </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-sm-12 col-xl-4 col-lg-12 col-md-12"">
                            <div class=""card "">
                                <div class=""card-body"">
                                    <div class=""counter-status d-flex md-mb-0"">
                                        <div class=""counter-icon bg-success-transparent"">
                                            <i class=""icon-rocket text-success""></i>
                                        </div>
                                        <div class=""ml-auto"">
                                            <h5 class=""tx-13"">Total Complete</h5>
                                            <h2 id=""total-complete"" class=""counter mb-0 tx-22 mb-1 mt-1 total-complete"">0</h2>
                                            <p class=""text-muted mb-0 tx-11""><i class=""si si-arrow-up-circle text-success mr-1""></i>incr");
                WriteLiteral(@"ease</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-sm-12 col-xl-4 col-lg-12 col-md-12"">
                            <div class=""card "">
                                <div class=""card-body"">
                                    <div class=""counter-status d-flex md-mb-0"">
                                        <div class=""counter-icon bg-danger-transparent"">
                                            <i class=""las la-edit text-danger""></i>
                                        </div>
                                        <div class=""ml-auto"">
                                            <h5 class=""tx-13"">Total InComplete</h5>
                                            <h2 id=""total-incomplete"" class=""counter mb-0 tx-22 mb-1 mt-1 total-incomplete"">0</h2>
                                            <p");
                WriteLiteral(@" class=""text-muted mb-0 tx-11""><i class=""si si-arrow-up-circle text-success mr-1""></i>increase</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""row"">
                        <div class=""col-12"">
                            <div class=""card"">
                                <div class=""card-body"">
                                    <div class=""row file_upload"">
                                        <div class=""col-md-3 text-xl-right"" style=""margin-top:5px;"">
                                            <label class=""form-label"">File Upload <span class=""tx-danger"">*</span></label>
                                        </div>
                                        <div class=""col-md-6"">
                                            <div class=""custom-file"">
                              ");
                WriteLiteral(@"                  <input class=""custom-file-input text-center"" id=""customFile"" type=""file"" accept=""application/vnd.ms-excel ,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet "">
                                                <label class=""custom-file-label"" for=""customFile"">Choose file</label>
                                            </div>
                                        </div>
                                        <div class=""col-sm-2"">
                                            <button type=""button"" target=""_blank"" class=""btn btn-success btn-icon btn_downloadtemplate""><i class=""las la-file-excel""></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-12 d-none"" id=""show_table_import"">
                            <div class=""card"">
                                <div class");
                WriteLiteral(@"=""card-body"">
                                    <div class=""table-responsive"">
                                        <table id=""table_import"" class=""table table-striped table-hover mg-b-0 text-md-nowrap"">
                                        </table>
                                    </div>
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
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
            </div>
            <div class=""modal-footer"">
                <button class=""col-1 btn ripple btn-primary btn-aciton"" id=""btn-upload"" type=""button"" disabled>Upload</button>
                <button class=""col-1 btn ripple btn-secondary"" data-dismiss=""modal"" type=""button"">Close</button>
            </div>
        </div>
    </div>
</div>
<!--End Scroll with content modal -->
");
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
