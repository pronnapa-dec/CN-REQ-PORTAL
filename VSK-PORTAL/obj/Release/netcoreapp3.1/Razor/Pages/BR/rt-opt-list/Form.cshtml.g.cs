#pragma checksum "F:\MIS-PROJECTS\MIS-PORTAL\MIS-PORTAL\Pages\BR\rt-opt-list\Form.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "e01de4494d03b1637d8765cea849d994387fb37d"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(MIS_PORTAL.Pages.BR.rt_opt_list.Pages_BR_rt_opt_list_Form), @"mvc.1.0.view", @"/Pages/BR/rt-opt-list/Form.cshtml")]
namespace MIS_PORTAL.Pages.BR.rt_opt_list
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"e01de4494d03b1637d8765cea849d994387fb37d", @"/Pages/BR/rt-opt-list/Form.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"da4f91d6f37072cc35f23d4c894b614ca986f555", @"/Pages/_ViewImports.cshtml")]
    public class Pages_BR_rt_opt_list_Form : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frm_list"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frm_list"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("autocomplete", new global::Microsoft.AspNetCore.Html.HtmlString("off"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("data-parsley-validate", new global::Microsoft.AspNetCore.Html.HtmlString(""), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            WriteLiteral("<!-- Scroll with content modal -->\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "e01de4494d03b1637d8765cea849d994387fb37d4512", async() => {
                WriteLiteral(@"
    <div class=""modal effect-flip-vertical"" id=""modal-return_list"" data-keyboard=""false"" data-backdrop=""static"">
        <div class=""modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered"" role=""document"">
            <div class=""modal-content modal-content-demo"">
                <div class=""modal-header"">
                    <h5 class=""modal-title"">???????????????????????????????????????????????????????????? NET</h5>
                    <button aria-label=""Close"" class=""close"" data-dismiss=""modal"" type=""button""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">
                    <div class=""row"">
                        <!--<div class=""col-12"">
                            <div class=""card card-primary"">
                                <div class=""card-body"">
                                    <div class=""row"">
                                        <label class=""col-sm-2 col-form-label tx-left"">???????????? Template <span class=""tx-danger"">*</span></label>
     ");
                WriteLiteral(@"                                   <label class=""col-sm-4 col-form-label tx-left"">?????????????????????????????? <span class=""tx-danger"">*</span></label>
                                        <label class=""col-sm-5 col-form-label tx-left"">???????????????????????? <span class=""tx-danger"">*</span></label>
                                        <label class=""col-sm-1 col-form-label tx-left"">&nbsp;</label>

                                        <div class=""col-sm-2"">
                                            <input type=""text"" class=""form-control"" id=""template_code"" name=""template_code"" placeholder="""" required="""">
                                        </div>
                                        <div class=""col-sm-4"">
                                            <input type=""text"" class=""form-control"" id=""template_detail"" name=""template_detail"" placeholder="""" required="""">
                                        </div>
                                        <div class=""col-sm-5"">
                                            <inp");
                WriteLiteral(@"ut type=""text"" class=""form-control"" id=""template_remark"" name=""template_remark"" placeholder="""">
                                        </div>
                                        <div class=""d-flex flex-row justify-content-center"">
                                            <div class=""d-btn-create"" style=""margin: 0 .125rem; "">
                                                <button class=""btn btn-outline-success btn-icon btn-action btn-create"" data-action=""create"" id=""create_item"" type=""submit""><i class=""typcn typcn-document-add""></i></button>
                                            </div>
                                            <div class=""d-btn-update d-none"" style=""margin: 0 .125rem;"">
                                                <button class=""btn btn-outline-primary btn-icon btn-action btn-update"" data-action=""update"" id=""update_item"" type=""submit""><i class=""typcn typcn-document-add""></i></button>
                                            </div>
                               ");
                WriteLiteral(@"             <div class=""d-btn-reset"" style=""margin: 0 .125rem; "">
                                                <button class=""btn btn-outline-secondary btn-icon btn-action btn-reset"" data-action=""reset"" id=""btn-reset"" type=""reset""><i class=""fas fa-undo""></i></button>-->
");
                WriteLiteral(@"                                            <!--</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>-->
                        <div class=""col-12"">
                            <div class=""card card-success"">
                                <div class=""card-body"">
                                    <table id=""tbl-prnetfile-list"" class=""table table-striped table-hover mg-b-0 text-md-nowrap"" width=""100%"">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>???????????? Template</th>
                                                <th>??????????????????????????????</th>
                                                <th>????????????????????????</th>
                                                <th>Update ????????????????????????????????????????????????</th>
        ");
                WriteLiteral(@"                                        <th>Update ?????????</th>
                                                <th class=""tx-center"">??????????????????</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
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
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n<!--End Scroll with content modal -->\r\n");
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
